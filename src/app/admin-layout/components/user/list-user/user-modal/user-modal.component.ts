import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { AuthService } from 'src/app/auth-layout/services/auth.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  sub!:any;
  submitted!:false;
  uid!:any
  users!:any;
  
  EditUserForm:FormGroup = new FormGroup({
    fullname:new FormControl(''),
    email:new FormControl(''),
    phone:new FormControl(''),
    address:new FormControl(''),
    status:new FormControl('')
  })

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private authservice: AuthService,
    private http: HttpClient) { }


  myForm() {
    this.EditUserForm = this.fb.group({
      fullname: ['', [ Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      address: ['', [ Validators.required]],
      status: ['', [ Validators.required]]
    });
  }

  ngOnInit(): void {
    this.myForm();

    this.sub = this.route.params.subscribe(params => {
      return this.uid = params['id'];
    });

    console.log(this.uid);

    this.authservice.GetAllUsers().subscribe((res:any) => {
        let result = res;
        this.users = result.filter((res:any) => Number(res.Userid) === Number(this.uid))

        if(this.users!= undefined)
        {
          this.EditUserForm.setValue({
           
            fullname: this.users[0].fullname,
            email: this.users[0].email,
            phone: this.users[0].phone,
            address: this.users[0].address,
            status: this.users[0].status,
          })
        }
    })
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
    // this.showSpinner();
   
    let userDetails= {
      fullname: this.EditUserForm.value.fullname,
      email: this.EditUserForm.value.email,
      phone: this.EditUserForm.value.phone,
      address: this.EditUserForm.value.address,
      status: this.EditUserForm.value.status,
      usertype: this.users[0].usertype
    }

    this.authservice.updateUser(this.uid, userDetails).subscribe((next) => {
      // console.log('Successfully Updated!');
      this.router.navigate(['/admin/users']);
    }, (err) => {
      if(err.status === 200)
      {
        // this.natification.success("Successfully Updated!");
        this.router.navigate(['/admin/users']);
      }
      else if(err.status === 201)
      {
        // this.natification.success("Successfully Updated!");
        this.router.navigate(['/admin/users']);
      }
      else if(err.status === 400)
      {
        // this.natification.danger("Something went wrong, please try again!");
      }
      else{
        // this.natification.danger("Something went wrong, please try again!");
      }
  });;
  }

  // showSpinner()
  // {
  //   this.spinner.show();

  //   setTimeout(()=>{
  //     this.spinner.hide();
  //   }, 2000)

  // }


}
