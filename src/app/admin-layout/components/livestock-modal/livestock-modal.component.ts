import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Livestock } from 'src/app/shared/models/livestock';
import { CategoryService } from 'src/app/shared/services/category.service';
import { BreedService } from 'src/app/shared/services/breed.service';
import { LivestockService } from 'src/app/shared/services/livestock.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

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
  agetypes!:any;

  selectedValue:any = null
  dtbaseImage:boolean=true;
  uplImage:boolean=false;
  fileUploaded: any = 'no';
  submitted :boolean = false;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  userId:string = String(sessionStorage.getItem('loggedID'));
  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';
    
  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: any = '';


  AddLivestockForm: FormGroup = new FormGroup({
    UserID: new FormControl(''),
    // image: new FormControl(''),
    price: new FormControl(''),
    gender: new FormControl(''),
    agetype: new FormControl(''),
    age: new FormControl(''),
    quantity:new FormControl(''),
    color:new FormControl(''),
    address:new FormControl(''),
    description: new FormControl(''),
    weight: new FormControl(''),
    categoryID: new FormControl(''),
    breedID: new FormControl(''),
  });

  preset :string = "nq04upkl";

  update_dp = new FormGroup({
    file:new FormControl(),
    upload_preset: new FormControl()}
  );

  cloudinaryUrl: string = 'https://api.cloudinary.com/v1_1/dbgjhr9ir/image/upload';
  file: any;
  isUpdating: boolean = false;

  constructor(private categoryService: CategoryService, private breedService: BreedService, private livestockService: LivestockService, 
    public fb: FormBuilder, private http:HttpClient, private route: ActivatedRoute,private router: Router,
    private spinner: NgxSpinnerService, private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      return this.lid = params['id'];
    });

    this.getCategory();
    
    this.livestockService.GetAllPostedLivestock().subscribe((res:any) => {
      let result = res;
      this.livestock = result.filter((res:any) => Number(res.livestockID) === Number(this.lid))
      this.myLivestock = this.livestock[0];

      if(this.livestock!= undefined)
      {

        let indexofEmptyStr = String(this.livestock[0].age).indexOf(" ");
        let lenghtStr = String(this.livestock[0].age).length;
        this.agetypes = String(this.livestock[0].age).slice((Number(indexofEmptyStr) + 1), Number(lenghtStr))

        let priceStr = String(String(this.livestock[0].price).slice(1, this.livestock[0].price?.length));
        let indexofEmptyStrprice = String(priceStr).indexOf(',');
        let lenghtStrPrice = String(priceStr).length;
        let prices = String(priceStr).slice(0, (Number(indexofEmptyStrprice) + 1)) + String(priceStr).slice((Number(indexofEmptyStrprice) + 1), Number(lenghtStrPrice))

        console.log(prices.split(',').join(''));

        this.AddLivestockForm.setValue({
          UserID: this.livestock[0].UserID,
          // image: this.livestock[0].image,
          price: Number(prices.split(',').join('')),
          gender: this.livestock[0].gender,
          agetype: String(this.livestock[0].age).slice((Number(indexofEmptyStr) + 1), Number(lenghtStr)),
          age: Number(String(this.livestock[0].age).slice(0, Number(indexofEmptyStr))),
          quantity: this.livestock[0].quantity,
          color: this.livestock[0].color,
          address: this.livestock[0].address,
          description: this.livestock[0].description,
          weight: this.livestock[0].weight,
          categoryID: this.livestock[0].categoryID,
          breedID: this.livestock[0].breedID,
        })

        console.log("palesa", this.AddLivestockForm.value)

        this.imageSrc == this.myLivestock.image;
      }

    });

  }


  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
    this.fileUploaded =  'yes';
  
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

  getCategory(){
    this.categoryService.GetAllCategory().subscribe((res:any) => {
      let result = res;
      this.category = result;
    });
  }

  checkSelected(event:any)
  {
    this.breedService.GetAllBreed().subscribe((res:any) => {
      let result = res;
      this.breed = result.filter((resss:any) => String(resss.categoryID) === String(event.target.value));
    });
  }

  async onFileChange(event :any)
  {
    if(event.target.files.length>0)
    {
      this.file =  event.target.files[0];
      this.fileUploaded =  'yes';
     
    }

  }

  upload()
  {
    let id = this.myLivestock.livestockID;

    let livestockDetails = {
      UserID: this.userId, 
      image: this.image_link, 
      price: this.AddLivestockForm.value.price, 
      age: (this.AddLivestockForm.value.age + " " + this.AddLivestockForm.value.agetype),
      status: 'Available',
      weight: this.AddLivestockForm.value.weight,
      categoryID: this.AddLivestockForm.value.categoryID,
      breedID: this.AddLivestockForm.value.breedID,
      description: this.AddLivestockForm.value.description,
      color:this.AddLivestockForm.value.color,
      quantity: this.AddLivestockForm.value.quantity,
      address: this.AddLivestockForm.value.address,
      gender: this.AddLivestockForm.value.gender,
    }

    console.log('Edit livestock',livestockDetails)
  
      this.livestockService.updateLivestock(id,livestockDetails).subscribe((next:any) => {
        console.log('Edited succefully');
    
        this.submitted = false;
      }, (err:any) => {
        if(err.status === 200)
        {
          let msg ="Successfully Edited!";
          this.notificationService.success(msg);
          this.router.navigate(['/homes']);
        }
        else if(err.status === 201)
        {
          let msg ="Successfully Edited!";
          this.notificationService.success(msg);

          this.router.navigate(['/homes']);
        }
        else if(err.status === 400)
        {
          let msg ="Something went wrong, please try again!";
          this.notificationService.danger(msg)
        }
        else{
          let msg = "Something went wrong, please try again!";
          this.notificationService.danger(msg)
        }
    });
      // this.router.navigate(['/homes']);
  } 
  

  editLivestock(){

    this.showSpinner();

    const formData = new FormData();

    if(this.fileUploaded ==  'yes'){
      formData.append("file",this.file)    
      formData.append("upload_preset","nq04upkl"); 
  
      this.http.post(this.cloudinaryUrl,formData).subscribe((res:any)=>{     
        this.image_link = res.url;
        this.image.link = this.image_link;

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

    handleDragEnter() {
        this.dragging = true;
    }
    
    handleDragLeave() {
        this.dragging = false;
    }
    
    handleDrop(e:any) {
        e.preventDefault();
        this.dragging = false;
        this.handleInputChange(e);
    }
    
    handleImageLoad() {
        this.imageLoaded = true;
    }

    handleInputChange(e:any) {
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        var pattern = /image-*/;
        var reader = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }
        if(e.target.files.length>0)
        {
          this.file =  e.target.files[0];
          this.fileUploaded =  'yes';
        }

        this.loaded = false;

        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);

    }
    
    _handleReaderLoaded(e:any) {
        var reader = e.target;
        this.imageSrc = reader.result;
        this.loaded = true;
    }

  showSpinner()
  {
    this.spinner.show();

    setTimeout(()=>{
      this.spinner.hide();
    }, 2000)

  }

}
