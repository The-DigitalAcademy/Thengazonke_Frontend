import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BreedService } from 'src/app/services/breed.service';
import { CategoryService } from 'src/app/services/category.service';
import { LivestockService } from 'src/app/services/livestock.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-create-livestock',
  templateUrl: './create-livestock.component.html',
  styleUrls: ['./create-livestock.component.scss']
})
export class CreateLivestockComponent implements OnInit {

  category!:any;
  breed!:any;
  image_link!:any;
  fileUploaded: any = 'no';


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
    breedID: new FormControl('')
  });

  submitted = false;

  preset :string = "nq04upkl";

  update_dp = new FormGroup({
    file:new FormControl(),
    upload_preset: new FormControl()}
  );

  myForm() {
    this.AddLivestockForm = this.fb.group({
      price:  ['', [ Validators.required, Validators.pattern('^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*))|0)(\\.\\d{1,2})?$') ]],
      gender: ['', [ Validators.required]],
      agetype: ['', [ Validators.required]],
      age: ['', [ Validators.required]],
      quantity: ['', [ Validators.required]],
      color: ['', [ Validators.required]],
      address: ['', [ Validators.required]],
      description: ['', [ Validators.required]],
      weight: ['', [ Validators.required]],
      categoryID: ['', [ Validators.required]],
      breedID: ['', [ Validators.required]]
    });
  }
  get formValidation(): { [key: string]: AbstractControl } {
    return this.AddLivestockForm.controls;
  }

  // pattern="(\d{3})([\.])(\d{2})"
  cloudinaryUrl: string = 'https://api.cloudinary.com/v1_1/dbgjhr9ir/image/upload';
  file: any;
  isUpdating: boolean = false;

  constructor(private categoryService: CategoryService, private breedService: BreedService, private livestockService: LivestockService, 
    public fb: FormBuilder, private http:HttpClient, private toast :HotToastService) { }

  ngOnInit(): void {

    this.myForm();

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
    if(event.target.files.length>0)
    {
      this.file =  event.target.files[0];
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
        UserID: Number(sessionStorage.getItem('loggedID')), 
        image: this.image.link, 
        price: this.AddLivestockForm.value.price,
        age: String(this.AddLivestockForm.value.age) + " "+ String(this.AddLivestockForm.value.agetype),
        status: 'Available',
        weight: this.AddLivestockForm.value.weight,
        categoryID: this.AddLivestockForm.value.categoryID,
        breedID: this.AddLivestockForm.value.breedID,
        description: this.AddLivestockForm.value.description,
        color: this.AddLivestockForm.value.color,
        quantity: this.AddLivestockForm.value.quantity,
        address: this.AddLivestockForm.value.address,
        gender: this.AddLivestockForm.value.gender
      }
  
      console.log(livestockDetails)

        this.livestockService.CreateLivestock(livestockDetails).subscribe((next:any) => {
          console.log('Add successfully!');
          this.successfullToast();
          // this.router.navigate(['/login']);
    
          // sessionStorage.setItem('token', JSON.stringify(userDetails)); 
    
          this.submitted = false;
        }, (err) => {

          console.log('jvugjvbhhjbjhfmbn', err)
          if(err.status === 201)
          {
            this.successfullToast();
          }
          else if(err.status === 400)
          {
            this.errorToast("Something went wrong, please try again!");
          }
          else{
            this.errorToast("Something went wrong, please try again!");
          }
      });
  

  
    }
    , (ERROR) => {

      console.log('jvugjvbhhjbjhfmbn', ERROR)
      if(ERROR.status === 201)
      {
        this.successfullToast();
      }
      else if(ERROR.status === 400)
      {
        this.errorToast("Something went wrong, please try again!");
      }
      else{
        this.errorToast("Something went wrong, please try again!");
      }
    }) 

    this.submitted = true;

  }  

  image = {
    link : '' 
  }



  activeColor: string = 'green';
    baseColor: string = '#ccc';
    overlayColor: string = 'rgba(255,255,255,0.5)';
    
    dragging: boolean = false;
    loaded: boolean = false;
    imageLoaded: boolean = false;
    imageSrc: string = '';
    
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

    successfullToast(){
      this.toast.success('Successfully Added!',{duration:6000 , style: {
        padding: '35px',
        width: '48%',
        height: '100px',
        margin: '12px auto',
        background: '#fff',
        border: '2px solid #fff',
      },
      iconTheme: {
        primary: '#4BB543',
        secondary: '#FFFAEE',
      },})
    }
  
    warningToast(){
      this.toast.warning('Boo!',{duration:6000 , style: {
        padding: '35px',
        width: '48%',
        height: '100px',
        margin: '12px auto',
        background: '#fff',
        border: '2px solid #fff',
      },
      iconTheme: {
        primary: '#FFCC00',
        secondary: '#FFFAEE',
      },})
    }
  
    errorToast(message:any){
      this.toast.error(message,{duration:2000 , style: {
        padding: '35px',
        width: '48%',
        height: '100px',
        margin: '12px auto',
        background: '#fff',
        border: '2px solid #fff',
      },
      iconTheme: {
        primary: '#DC3545',
        secondary: '#FFFAEE',
      },})
    }

}
