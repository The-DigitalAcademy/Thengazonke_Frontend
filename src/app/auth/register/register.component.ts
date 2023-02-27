import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators,ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  tempStatus:any;
  selected: any = 'Buyer';

  AddUserForm: UntypedFormGroup = new UntypedFormGroup({
    fullname: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    // phone:  new FormControl(''),
    password: new UntypedFormControl(''),
    usertype:  new UntypedFormControl('')
});

decoded: any;

submitted = false;
passwordErr!:any;

constructor(private authService:AuthService, private router: Router, public fb: UntypedFormBuilder, private toast :HotToastService,
  private spinner:NgxSpinnerService) { }

myForm() {
  this.AddUserForm = this.fb.group({
    fullname: ['', [ Validators.required, Validators.minLength(3),Validators.maxLength(50) ]],
    email: ['', [Validators.required, Validators.email]],
    password:  ['', [ Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,15}') ]],
    confirmPassword:  ['', [ Validators.required, Validators.minLength(8) ]],
    usertype:  ['', [ Validators.required ]]
  },
  {
    validators: [this.match('password', 'confirmPassword')]
  });
}
ngOnInit(): void {
  this.myForm();
}

get formValidation(): { [key: string]: AbstractControl } {
  return this.AddUserForm.controls;
}

match(controlName: string, checkControlName: string): ValidatorFn {
  return (controls: AbstractControl) => {
    const control = controls.get(controlName);
    const checkControl = controls.get(checkControlName);

    if (checkControl?.errors && !checkControl.errors['matching']) {
      return null;
    }

    if (control?.value !== checkControl?.value) {
      controls.get(checkControlName)?.setErrors({ matching: true });
      return { matching: true };
    } else {
      return null;
    }
  };
}

AddUser()
{
  this.showSpinner();

  this.submitted = true;

    if(this.AddUserForm.value.confirmPassword === this.AddUserForm.value.password && this.AddUserForm.value.firstname != '')
    {
      this.passwordErr = "";

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

          this.successfullToast();
          sessionStorage.setItem('loggedEmail', this.AddUserForm.value.email);

          if(this.AddUserForm.value.usertype === 'Buyer')
          {
            this.router.navigate(['/home']);
          }
          if(this.AddUserForm.value.usertype === 'Seller')
          {
            this.router.navigate(['/homes']);
          }

          this.submitted = false;
        }, (err) => {
          console.log(err.status);

          if(Number(err.status) === Number(0)){
            let msg = `There's been an error please try again`;
            this.errorToast(msg)
          }
          else if(err.status === 201){

          this.successfullToast();
          }
          else{
            this.errorToast("Something went wrong, please try again")
          }
      });

    }
    else  
    {
      let msg = 'Please provide creaditials!';
        this.errorToast(msg)
    }
 
}

checkSelected(event:any){
  this.selected = event.target.value;
  console.log(this.selected);
}

successfullToast(){
  this.toast.success('Successfully registered!',{duration:6000 , style: {
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

showSpinner()
{
  this.spinner.show();

  setTimeout(()=>{
    this.spinner.hide();
  }, 2000)

}

}
