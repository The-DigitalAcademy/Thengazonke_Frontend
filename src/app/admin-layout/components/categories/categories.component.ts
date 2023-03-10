import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  category!:any;
  deleteID!:any;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategory();
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
