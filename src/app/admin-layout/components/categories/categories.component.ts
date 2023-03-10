import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  category!:any;
  deleteID!:any;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild('pdfReport', { static: false })
  pdfReport!: ElementRef;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategory();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu : [5, 10, 25],
      processing: true,
      paging: false,
      searching: false,
      deferRender: true,
      destroy: true,
     };
  }

  getCategory(){
    this.categoryService.GetAllCategory().subscribe((res:any) => {
      let result = res;
      this.category = result;
      this.dtTrigger.next(this.category)
    });
  }

  DeleteCat()
  {
    // this.showSpinner();
    
    let st= {
      status: "archived"
    }

    // this.authService.DeleteUser(this.deleteID, st).subscribe(async res => {
    //   await this.getCategory();
    // })

    this.closeModal();

  }

  deleteCat(categoryID:any)
  {
    this.deleteID = categoryID;
  }

  downloadAsPDF(){
    let DATA: any = document.getElementById('table');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('users_report.pdf');
    });
  }

  closeModal() {
    let modalCheckbox:any = document.getElementById('my-modal')
    modalCheckbox.checked = false
  }

  // showSpinner()
  // {
  //   this.spinner.show();

  //   setTimeout(()=>{
  //     this.spinner.hide();
  //   }, 2000)

  // }


}
