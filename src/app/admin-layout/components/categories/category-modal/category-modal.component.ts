import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {

  editCategoryId!:any;
  title: string = 'Add Category';
  category!:any;
  sub!:any;
  submitted!:false;

  EditCategoryForm:FormGroup = new FormGroup({
    categoryName:new FormControl('')
  })

  myForm() {
    this.EditCategoryForm = this.fb.group({
      categoryName: ['', [ Validators.required, Validators.minLength(2)]],
    });
  }

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.myForm();
    this.sub = this.route.params.subscribe(params => {
      return this.editCategoryId = params['id'];
    });

    if(this.editCategoryId != undefined)
    {
      this.title = "Edit Category";

      this.populateDate(this.editCategoryId)
    }
  }

  populateDate(categoryId:any){

    this.categoryService.GetAllCategory().subscribe((res:any) => {
      let result = res;
      this.category = result.filter((res:any) => Number(res.categoryID) === Number(categoryId))

      if(this.category!= undefined)
      {
        this.EditCategoryForm.setValue({
          categoryName: this.category[0].categoryName
        })
        console.log(this.category[0].categoryName)
      }
    })

  }

  updateCategory()
  {
    let CategoryDetails = {
      categoryName: this.EditCategoryForm.value.categoryName,
    }
    let categoryID = this.editCategoryId;

    console.log(CategoryDetails);
    console.log(categoryID);

    this.categoryService.updateCategory(categoryID, CategoryDetails).subscribe((next:any) => {
      console.log('Edited succefully');
  
      this.submitted = false;
    }, (err) => {
      if(err.status === 200)
      {
        let msg ="Successfully Edited!";
        // this.notificationService.success(msg);
        this.router.navigate(['/admin/category']);
      }
      else if(err.status === 201)
      {
        let msg ="Successfully Edited!";
        // this.notificationService.success(msg);

        this.router.navigate(['/admin/category']);
      }
      else if(err.status === 400)
      {
        let msg ="Something went wrong, please try again!";
        // this.notificationService.danger(msg)
      }
      else{
        let msg = "Something went wrong, please try again!";
        // this.notificationService.danger(msg)
      }
  });
  }

  addCategory(){

    let CategoryDetails = {
      categoryName: this.EditCategoryForm.value.categoryName,
    }

    console.log(CategoryDetails);

    this.categoryService.createCategory(CategoryDetails).subscribe((next:any) => {
      console.log('Add succefully');
  
      this.submitted = false;
    }, (err) => {
      if(err.status === 200)
      {
        let msg ="Successfully Added!";
        // this.notificationService.success(msg);
        this.router.navigate(['/admin/category']);
      }
      else if(err.status === 201)
      {
        let msg ="Successfully Added!";
        // this.notificationService.success(msg);

        this.router.navigate(['/admin/category']);
      }
      else if(err.status === 400)
      {
        let msg ="Something went wrong, please try again!";
        // this.notificationService.danger(msg)
      }
      else{
        let msg = "Something went wrong, please try again!";
        // this.notificationService.danger(msg)
      }
  });

  }
}
