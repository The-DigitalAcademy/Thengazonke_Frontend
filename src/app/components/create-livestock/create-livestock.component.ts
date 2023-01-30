import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BreedService } from 'src/app/services/breed.service';
import { CategoryService } from 'src/app/services/category.service';
import { LivestockService } from 'src/app/services/livestock.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-livestock',
  templateUrl: './create-livestock.component.html',
  styleUrls: ['./create-livestock.component.scss']
})
export class CreateLivestockComponent implements OnInit {

  category!:any;
  breed!:any;
  image_link!:any;


  AddLivestockForm: FormGroup = new FormGroup({
    UserID: new FormControl(''),
    // image: new FormControl(''),
    price: new FormControl(''),
    age: new FormControl(''),
    // status: new FormControl(''),
    weight: new FormControl(''),
    categoryID: new FormControl(''),
    breedID: new FormControl('')
  });

  submitted = false;

  preset :string = "nq04upkl";

  update_dp = new FormGroup({
    file:new FormControl(),
    upload_preset: new FormControl()}
  );

  cloudinaryUrl: string = 'https://api.cloudinary.com/v1_1/dbgjhr9ir/image/upload';
  file: any;
  isUpdating: boolean = false;

  constructor(private categoryService: CategoryService, private breedService: BreedService, private livestockService: LivestockService, 
    public fb: FormBuilder, private http:HttpClient) { }

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

  async onFileChange(event :any)
  {
    // this.spinner.show();

    if(event.target.files.length>0)
    {
      this.file =  event.target.files[0];
      // this.spinner.hide();
     
    }

  }

  addLivestock()
  {

    // ---------------------picture--------------

    const formData = new FormData();    
    formData.append("file",this.file)    
    formData.append("upload_preset","nq04upkl"); 

    this.http.post(this.cloudinaryUrl,formData).subscribe((res:any)=>{     
      this.image_link = res.url;
      this.image.link = this.image_link;

      console.log(this.image.link)

      let livestockDetails = {
        UserID: 8, 
        image: this.image.link, 
        price: this.AddLivestockForm.value.price, 
        age: this.AddLivestockForm.value.age,
        status: 'Available',
        weight: this.AddLivestockForm.value.weight,
        categoryID: this.AddLivestockForm.value.categoryID,
        breedID: this.AddLivestockForm.value.breedID
      }
  
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
  

  
    }) 

  }  

  image = {
    link : '' 
  }


}
