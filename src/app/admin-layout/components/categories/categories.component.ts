import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';

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
