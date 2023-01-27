import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BreedService } from 'src/app/services/breed.service';
import { CategoryService } from 'src/app/services/category.service';
import { LivestockService } from 'src/app/services/livestock.service';

@Component({
  selector: 'app-create-livestock',
  templateUrl: './create-livestock.component.html',
  styleUrls: ['./create-livestock.component.scss']
})
export class CreateLivestockComponent implements OnInit {

  category!:any;
  breed!:any;


  AddLivestockForm: FormGroup = new FormGroup({
    UserID: new FormControl(''),
    image: new FormControl(''),
    price: new FormControl(''),
    age: new FormControl(''),
    // status: new FormControl(''),
    weight: new FormControl(''),
    categoryID: new FormControl(''),
    breedID: new FormControl('')
  });

  submitted = false;


  constructor(private categoryService: CategoryService, private breedService: BreedService, private livestockService: LivestockService, public fb: FormBuilder) { }

  ngOnInit(): void {

    this.categoryService.GetAllCategory().subscribe((res:any) => {
      this.category = res;
      console.log(this.category);
    });

  }
  checkSelected(event:any)
  {
    console.log(event.target.value);

    this.breedService.GetAllBreed().subscribe((res:any) => {
      let result = res;

      this.breed = result.filter((resss:any) => String(resss.categoryID) === String(event.target.value));
      console.log(this.breed);
    });

  }

  addLivestock()
  {
    let livestockDetails = {
      UserID: 8, 
      image: 'http://', 
      price: this.AddLivestockForm.value.price, 
      age: this.AddLivestockForm.value.age,
      status: 'Available',
      weight: this.AddLivestockForm.value.weight,
      categoryID: this.AddLivestockForm.value.categoryID,
      breedID: this.AddLivestockForm.value.breedID
    }
    console.log("hello", livestockDetails);


    this.livestockService.CreateLivestock(livestockDetails).subscribe((next:any) => {
      console.log('Add successfully!');
      // this.openSuccess();
      // this.router.navigate(['/login']);

      // sessionStorage.setItem('token', JSON.stringify(userDetails)); 

      this.submitted = false;
    }, (err) => {
      // this.toast.warning({detail:'Warning',summary:'Fillup the form or Email already exist', sticky:false,position:'tr', duration:6000})
      console.log(err);
  });
    

  }

  

}
