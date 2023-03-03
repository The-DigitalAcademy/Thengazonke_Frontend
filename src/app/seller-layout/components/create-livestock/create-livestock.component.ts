import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LivestockService } from 'src/app/shared/services/livestock.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { BreedService } from 'src/app/shared/services/breed.service';
import { Livestock } from 'src/app/shared/models/livestock';

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
  submitted :boolean = false;
  sub:any;
  editLivestockId:any
  livestock!:any;
  myLivestock!:Livestock;
  agetypes!:string;
  title:string = 'Create Livestock';


  AddLivestockForm: UntypedFormGroup = new UntypedFormGroup({
    UserID: new UntypedFormControl(''),
    // image: new FormControl(''),
    price: new UntypedFormControl(''),
    gender: new UntypedFormControl(''),
    agetype: new UntypedFormControl(''),
    age: new UntypedFormControl(''),
    quantity:new UntypedFormControl(''),
    color:new UntypedFormControl(''),
    address:new UntypedFormControl(''),
    description: new UntypedFormControl(''),
    weight: new UntypedFormControl(''),
    categoryID: new UntypedFormControl(''),
    breedID: new UntypedFormControl('')
  });

  

  update_dp = new UntypedFormGroup({
    file:new UntypedFormControl(),
    upload_preset: new UntypedFormControl()}
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
    public fb: UntypedFormBuilder, private http:HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.myForm();

    this.categoryService.GetAllCategory().subscribe((res:any) => {
      this.category = res;
    });

    this.sub = this.route.params.subscribe(params => {
      return this.editLivestockId = params['id'];
    });

    if(this.editLivestockId != undefined)
    {
      this.title = "Edit Livestock";

      this.populateDate(this.editLivestockId)
    }

  }

  populateDate(editLivestockId:any)
  {
    this.livestockService.GetAllPostedLivestock().subscribe((res:any) => {
      let result = res;
      this.livestock = result.filter((res:any) => Number(res.livestockID) === Number(editLivestockId))
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
          // UserID: this.livestock[0].UserID,
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

        this.imageSrc = String(this.myLivestock.image);

        console.log('ima', this.imageSrc)
      }

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
          // this.natification.success("Successfully Added!");
          this.router.navigate(['/seller']);
    
          this.submitted = false;
        }, (err:any) => {
          if(err.status === 201)
          {
            // this.natification.success("Successfully Added!");
            this.router.navigate(['/seller']);
          }
          else if(err.status === 400)
          {
            // this.natification.danger("Something went wrong, please try again!")
          }
          else{
            // this.natification.warning("Something went wrong, please try again!");
          }
      });
  

  
    }
    , (ERROR) => {
      if(ERROR.status === 201)
      {
        // this.natification.success("Successfully Added!");
        this.router.navigate(['/seller']);
      }
      else if(ERROR.status === 400)
      {
        // this.natification.danger("Something went wrong, please try again!");
      }
      else{
        // this.natification.danger("Something went wrong, please try again!");
      }
    }) 

    this.submitted = true;

  }  

  upload()
  {
    let id = this.myLivestock.livestockID;

    let livestockDetails = {
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
      }, (err) => {
        if(err.status === 200)
        {
          let msg ="Successfully Edited!";
          // this.notificationService.success(msg);
          this.router.navigate(['/homes']);
        }
        else if(err.status === 201)
        {
          let msg ="Successfully Edited!";
          // this.notificationService.success(msg);

          this.router.navigate(['/homes']);
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
      // this.router.navigate(['/homes']);
  } 
  

  editLivestock(){

    // this.showSpinner();

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

    // successfullToast(){
    //   this.toast.success('Successfully Added!',{duration:6000 , style: {
    //     padding: '35px',
    //     width: '48%',
    //     height: '100px',
    //     margin: '12px auto',
    //     background: '#fff',
    //     border: '2px solid #fff',
    //   },
    //   iconTheme: {
    //     primary: '#4BB543',
    //     secondary: '#FFFAEE',
    //   },})
    // }
  
    // warningToast(){
    //   this.toast.warning('Boo!',{duration:6000 , style: {
    //     padding: '35px',
    //     width: '48%',
    //     height: '100px',
    //     margin: '12px auto',
    //     background: '#fff',
    //     border: '2px solid #fff',
    //   },
    //   iconTheme: {
    //     primary: '#FFCC00',
    //     secondary: '#FFFAEE',
    //   },})
    // }
  
    // errorToast(message:any){
    //   this.toast.error(message,{duration:2000 , style: {
    //     padding: '35px',
    //     width: '48%',
    //     height: '100px',
    //     margin: '12px auto',
    //     background: '#fff',
    //     border: '2px solid #fff',
    //   },
    //   iconTheme: {
    //     primary: '#DC3545',
    //     secondary: '#FFFAEE',
    //   },})
    // }

}
