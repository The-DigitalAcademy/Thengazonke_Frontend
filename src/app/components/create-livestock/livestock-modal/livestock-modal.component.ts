import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BreedService } from 'src/app/services/breed.service';
import { CategoryService } from 'src/app/services/category.service';
import { LivestockService } from 'src/app/services/livestock.service';
import { Observable, of } from 'rxjs/';
import { Livestock } from 'src/app/model/livestock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livestock-modal',
  templateUrl: './livestock-modal.component.html',
  styleUrls: ['./livestock-modal.component.scss']
})
export class LivestockModalComponent implements OnInit {

  myObservable$: Observable<any> | undefined;

  myLivestock!:Livestock;

  category!:any;
  breed!:any;
  image_link!:any;
  sub!:any;
  lid!:any;
  livestock: Livestock[] = [];
  selectedValue:any = null
  dtbaseImage:boolean=true;
  uplImage:boolean=false;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  userId:string = String(sessionStorage.getItem('loggedID'));

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      
      if (file) {
        this.preview = '';
        this.currentFile = file;
  
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };
  
        reader.readAsDataURL(this.currentFile);
      }



    }

    this.uploadHide()

  

  }


  selectedTeam = '';
	onSelected(value:string): void {
		this.selectedTeam = value;
	}


  AddLivestockForm: FormGroup = new FormGroup({
    UserID: new FormControl(''),
    // image: new FormControl(''),
    price: new FormControl(''),
    age: new FormControl(''),
    // status: new FormControl(''),
    description: new FormControl(''),
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
    public fb: FormBuilder, private http:HttpClient, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      return this.lid = params['id'];
    });

    console.log(this.lid);

    console.log('i am added',this.category);
    

    this.livestockService.GetAllPostedLivestock().subscribe((res:any) => {
      let result = res;

      this.livestock = result.filter((res:any) => Number(res.livestockID) === Number(this.lid))

      console.log('data i need',this.livestock[0]);

      this.myLivestock = this.livestock[0];

      console.log("this.myLivestock",this.myLivestock)

      if(this.livestock!= undefined)
      {
        this.AddLivestockForm.setValue({
          UserID: this.livestock[0].UserID,
          // image: this.livestock[0].image,
          price: this.livestock[0].price,
          age: this.livestock[0].age,
          // status: new FormControl(''),
          description: this.livestock[0].description,
          weight: this.livestock[0].weight,
          categoryID: this.livestock[0].categoryID,
          breedID: this.livestock[0].breedID
        })
        console.log(this.AddLivestockForm.value);
      }

    });

  }
  checkSelected(event:any)
  {
    console.log(event.target.value);

    this.breedService.GetAllBreed().subscribe((res:any) => {
      let result = res;

      console.log('breed from services',result)

      this.breed = result.filter((resss:any) => String(resss.categoryID) === String(event.target.value));
      console.log('this is the breed',this.breed);
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

  upload()
  {
    // this.convertImage()

    let id = this.myLivestock.livestockID;

    let livestockDetails = {
      UserID: this.userId, 
      image: this.image_link, 
      price: this.AddLivestockForm.value.price, 
      age: this.AddLivestockForm.value.age,
      status: 'Available',
      weight: this.AddLivestockForm.value.weight,
      categoryID: this.AddLivestockForm.value.categoryID,
      breedID: this.AddLivestockForm.value.breedID,
      description: this.AddLivestockForm.value.description,
      color:'color',
      quantity:23,
      address:'Pretoria soshanguve',
      gender: 'male',
    }

    console.log('Edit livestock',livestockDetails)
  
        this.livestockService.updateLivestock(id,livestockDetails).subscribe((next:any) => {
          console.log('Edited succefully');
          // this.openSuccess();
          
    
          // sessionStorage.setItem('token', JSON.stringify(userDetails)); 
    
          this.submitted = false;
        }, (err) => {
          console.log(err);
      });
      this.router.navigate(['/homes']);
  } 
  

  editLivestock(){

    const formData = new FormData();
    if(this.preview){
      formData.append("file",this.preview)    
      formData.append("upload_preset","nq04upkl"); 
  
      this.http.post(this.cloudinaryUrl,formData).subscribe((res:any)=>{     
        this.image_link = res.url;
        this.image.link = this.image_link;
        console.log('I am  dot',this.image.link)
        console.log('I am  underscore',this.image_link)

        this.upload();
      })  

    }

    else{
      this.image_link = this.myLivestock.image
      this.upload()

    }
  }

  image = {
    link : '' 
  }

  uploadHide(){
    this.dtbaseImage = false
    this.uplImage = true
}

}