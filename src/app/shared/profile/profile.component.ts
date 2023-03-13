import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { async } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import * as saveAs from 'file-saver';
import { AuthService } from 'src/app/auth-layout/services/auth.service';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  sub!:any;
  uid!:any;
  users!:any;
  fullname: any;
  email: any;
  phone: any;
  cloudinaryUrl: string = 'https://api.cloudinary.com/v1_1/dbgjhr9ir/image/upload';
  idFile: any;
  agricFile: any;
  idfile_link:any
  agrifile_link:any
  isUpdating: boolean = false;
  userData:any;

    constructor(private sanitizer: DomSanitizer, private router: Router,private route: ActivatedRoute, private authservice: AuthService,
    private http: HttpClient, private fb: UntypedFormBuilder , private notificationService : NotificationService) { }
  
    EditUserForm:UntypedFormGroup = new UntypedFormGroup({
      fullname:new UntypedFormControl(''),
      email:new UntypedFormControl(''),
      phone:new UntypedFormControl(''),
      address:new UntypedFormControl(''),
      identity:new UntypedFormControl(''),
      agric:new UntypedFormControl(''),
      status:new UntypedFormControl('')
    })
  
    myForm() {
      this.EditUserForm = this.fb.group({
        fullname: ['', [ Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
        address: ['', [ Validators.required]],
        identity: ['', [ Validators.required]],
        agric: ['', [ Validators.required]],
        status: ['', [ Validators.required]]
      });
    }
  
    ngOnInit(): void {
  
      this.myForm();
  
      this.authservice.GetAllUsers().subscribe((res:any) => {
          let result = res;
          
          this.users = result.filter((res:any) => String(res.email) === String(sessionStorage.getItem('loggedEmail')))
          console.log(this.users);



          if(this.users!= undefined)
          {


            this.EditUserForm = this.fb.group({
              fullname: [this.users[0].fullname, [ Validators.required, Validators.minLength(2)]],
              email: [this.users[0].email, [Validators.required, Validators.email]],
              phone: [this.users[0].phone, [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
              address: [this.users[0].address, [ Validators.required]],
              identity: ['', [ Validators.required]],
              agric: ['', [ Validators.required]],
              status: [this.users[0].status, [ Validators.required]]
            });



            // this.EditUserForm.setValue({
             
            //   fullname: this.users[0].fullname,
            //   email: this.users[0].email,
            //   phone: this.users[0].phone,
            //   address: this.users[0].address,
            //   identity: this.users[0].id_document,
            //   // agric: this.users[0].agric_document,
            //   status: this.users[0].status,
            // })
          }
      })
  
    }

 async onFileChange(event :any)
  {
    if(event.target.files.length>0)
    {
      this.idFile =  event.target.files[0];
      console.log(this.idFile)
    }

  }

  async onFileChange2(event :any)
  {
    if(event.target.files.length>0)
    {
      this.agricFile =  event.target.files[0];
      console.log(this.agricFile)
    }

  }

  files = {
    link : '' 
  }

  downloadFile(file:any){

    this.http.get(file, { responseType: 'blob' }).subscribe(response => {
      saveAs(response, '.pdf');
    },(error:HttpErrorResponse)=>{
      //failed to retrieve pdf file
      console.log(error);

    });
  }

  updateUser(){

      const formData = new FormData();    
      formData.append("file",this.idFile)    
      formData.append("upload_preset","nq04upkl"); 

      this.http.post(this.cloudinaryUrl,formData).subscribe((res:any)=>{     
        let link = res.url;
        this.files.link = link;
        this.idfile_link = this.files.link

        const form = new FormData();    
        form.append("file",this.agricFile)    
        form.append("upload_preset","nq04upkl"); 
    
        this.http.post(this.cloudinaryUrl,formData).subscribe((res:any)=>{     
          let link = res.url;
          this.files.link = link;
          this.agrifile_link = this.files.link

          let userDetails= {
            fullname: this.EditUserForm.value.fullname,
            email: this.EditUserForm.value.email,
            phone: this.EditUserForm.value.phone,
            address: this.EditUserForm.value.address,
            status: this.EditUserForm.value.status,
            usertype: this.users[0].usertype,
            id_document : this.idfile_link,
            agric_document : this.agrifile_link
          }
          this.authservice.updateUser(this.users[0].Userid,userDetails).subscribe((next:any) => {
            this.router.navigate(['/profile']);
          }, (err:any) => {
          console.log(err.status);

          if(Number(err.status) === Number(0)){
            let msg = `There's been an error please try again`;
            this.notificationService.danger(msg);
          }
          else if(err.status === 200){

            this.notificationService.success("Profile successfully updated");
          }
          else if(err.status === 201){

            this.notificationService.success("Profile successfully updated");
          }
          else{
            let msg = "Something went wrong, please try again";
            this.notificationService.danger(msg);
          }
      });

          
        })
        

      })

      
    //  this.dataInitialisation();
    
    
  }
  notSellerUpdate()
  {
    let userDetails= {
      fullname: this.EditUserForm.value.fullname,
      email: this.EditUserForm.value.email,
      phone: this.EditUserForm.value.phone,
      address: this.EditUserForm.value.address,
      status: this.EditUserForm.value.status,
      usertype: this.users[0].usertype
    }
    this.authservice.updateUser(this.users[0].Userid,userDetails).subscribe((next:any) => {
      this.router.navigate(['/profile']);
    }, (err:any) => {
    console.log(err.status);

    if(Number(err.status) === Number(0)){
      let msg = `There's been an error please try again`;
      this.notificationService.danger(msg);
    }
    else if(err.status === 200){

      this.notificationService.success("Profile successfully updated");
    }
    else if(err.status === 201){

      this.notificationService.success("Profile successfully updated");
    }
    else{
      let msg = "Something went wrong, please try again";
      this.notificationService.danger(msg);
    }
});
  }
}