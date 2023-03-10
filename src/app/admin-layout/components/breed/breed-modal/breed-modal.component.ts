import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreedService } from 'src/app/shared/services/breed.service';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-breed-modal',
  templateUrl: './breed-modal.component.html',
  styleUrls: ['./breed-modal.component.scss']
})
export class BreedModalComponent implements OnInit {

  editBreedId!:any;
  title: string = 'Add Breed';
  category!:any;
  breed!:any;
  sub!:any;
  submitted!:false;

  EditBreedForm:FormGroup = new FormGroup({
    categoryID:new FormControl(''),
    breedName:new FormControl(''),
    description:new FormControl('')
  })

  myForm() {
    this.EditBreedForm = this.fb.group({
      categoryID: ['', [ Validators.required]],
      breedName: ['', [ Validators.required, Validators.minLength(2)]],
      description: ['', [ Validators.required]],
    });
  }

  constructor(private route: ActivatedRoute, private router: Router, private breedService: BreedService, private categoryService: CategoryService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.myForm();
    this.getCategory();
    this.sub = this.route.params.subscribe(params => {
      return this.editBreedId = params['id'];
    });

    if(this.editBreedId != undefined)
    {
      this.title = "Edit Breed";

      this.populateDate(this.editBreedId)
    }

  }

  populateDate(editBreedId:any){

    this.breedService.GetAllBreed().subscribe((res:any) => {
      let result = res;
      this.breed = result.filter((res:any) => Number(res.breedID) === Number(editBreedId))

      if(this.breed!= undefined)
      {
        this.EditBreedForm.setValue({
          categoryID: this.breed[0].categoryID,
          breedName: this.breed[0].breedName,
          description: this.breed[0].description
        })
        // console.log(this.category[0].categoryName)
      }
    })

  }

  getCategory(){
    this.categoryService.GetAllCategory().subscribe((res:any) => {
      let result = res;
      this.category = result;
    });
  }

  updateBreed(){

    let BreedDetails = {
      categoryID: this.EditBreedForm.value.categoryID,
      breedName: this.EditBreedForm.value.breedName,
      description: this.EditBreedForm.value.description
    }
    let breedID = this.editBreedId;

    console.log(BreedDetails);
    console.log(breedID);

    this.breedService.updateBreed(breedID, BreedDetails).subscribe((next:any) => {
      console.log('Edited succefully');
  
      this.submitted = false;
    }, (err) => {
      if(err.status === 200)
      {
        let msg ="Successfully Edited!";
        // this.notificationService.success(msg);
        this.router.navigate(['/admin/breed']);
      }
      else if(err.status === 201)
      {
        let msg ="Successfully Edited!";
        // this.notificationService.success(msg);

        this.router.navigate(['/admin/breed']);
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

  addBreed(){

    let BreedDetails = {
      categoryID: this.EditBreedForm.value.categoryID,
      breedName: this.EditBreedForm.value.breedName,
      description: this.EditBreedForm.value.description
    }

    console.log(BreedDetails);

    this.breedService.createBreed(BreedDetails).subscribe((next:any) => {
      console.log('Add succefully');
  
      this.submitted = false;
    }, (err) => {
      if(err.status === 200)
      {
        let msg ="Successfully Added!";
        // this.notificationService.success(msg);
        this.router.navigate(['/admin/breed']);
      }
      else if(err.status === 201)
      {
        let msg ="Successfully Added!";
        // this.notificationService.success(msg);

        this.router.navigate(['/admin/breed']);
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
