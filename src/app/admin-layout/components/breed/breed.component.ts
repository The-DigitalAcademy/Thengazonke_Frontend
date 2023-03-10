import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BreedService } from 'src/app/shared/services/breed.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss']
})
export class BreedComponent implements OnInit {

  category!:any;
  breed!:any;
  deleteID!:any;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild('pdfReport', { static: false })
  pdfReport!: ElementRef;

  constructor(private BreedService: BreedService, private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategory();
    this.GetBreed();

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

  GetBreed(){
    this.BreedService.GetAllBreedWithCat().subscribe((res:any) => {
      let result = res;
      this.breed = result;

      this.dtTrigger.next(this.breed)
    });
  }

  getCategory(){
    this.categoryService.GetAllCategory().subscribe((res:any) => {
      let result = res;
      this.category = result;
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
