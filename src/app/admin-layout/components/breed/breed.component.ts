import { Component, OnInit } from '@angular/core';
import { BreedService } from 'src/app/shared/services/breed.service';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss']
})
export class BreedComponent implements OnInit {

  category!:any;
  breed!:any;
  deleteID!:any;

  constructor(private BreedService: BreedService, private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategory();
    this.GetBreed();
  }

  GetBreed(){
    this.BreedService.GetAllBreedWithCat().subscribe((res:any) => {
      let result = res;
      this.breed = result;
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
