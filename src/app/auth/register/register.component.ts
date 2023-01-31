import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  tempStatus:any;

  AddUserForm: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    email: new FormControl(''),
    // phone:  new FormControl(''),
    password: new FormControl(''),
    usertype:  new FormControl('')
});

decoded: any;

submitted = false;
passwordErr!:any;

constructor(private authService:AuthService, private router: Router, public fb: FormBuilder) { }

myForm() {
  this.AddUserForm = this.fb.group({
    fullname: ['', [ Validators.required, Validators.minLength(3),Validators.maxLength(50) ]],
    email: ['', [Validators.required, Validators.email]],
    // phone:  ['', [ Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
    password:  ['', [ Validators.required, Validators.minLength(8) ]],
    confirmPassword:  ['', [ Validators.required, Validators.minLength(8) ]],
    usertype:  ['', [ Validators.required ]]

    // fullname,
    //             email,
    //             password: hash,
    //             phone,
    //             address,
    //             status,
    //             usertype
  });
}
ngOnInit(): void {
  this.myForm();
}

get formValidation(): { [key: string]: AbstractControl } {
  return this.AddUserForm.controls;
}


AddUser()
{
  
    this.submitted = true;

    console.log()

    if(this.AddUserForm.value.confirmPassword === this.AddUserForm.value.password && this.AddUserForm.value.firstname != '')
    {

      if(this.AddUserForm.value.usertype === 'Seller')
      {
        this.tempStatus = "Not verified";
      }

      if(this.AddUserForm.value.usertype === 'Buyer')
      { 
        this.tempStatus = "verified";
      }

      let userDetails = {
        fullname:this.AddUserForm.value.fullname,
        email: this.AddUserForm.value.email,
        password: this.AddUserForm.value.password,
        phone: "N/A",
        address: "N/A",
        status: this.tempStatus,
        usertype: this.AddUserForm.value.usertype,

      }
  
      console.log(userDetails);
  
      this.authService.RegisterUser(userDetails).subscribe((next:any) => {
          console.log('Add successfully!');
          // this.openSuccess();

          sessionStorage.setItem('loggedEmail', this.AddUserForm.value.email);

          this.router.navigate(['/']);

          this.submitted = false;
        }, (err) => {
          // this.toast.warning({detail:'Warning',summary:'Fillup the form or Email already exist', sticky:false,position:'tr', duration:6000})
          console.log(err);
      });

    }
    else
    {
      // this.openWarning();
      this.passwordErr = "Password does not match";
    }
 
}


}
