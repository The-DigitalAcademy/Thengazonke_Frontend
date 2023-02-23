import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { HotToastService } from '@ngneat/hot-toast';

// import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 selected: any = 'Buyer';
 box!: any;
  UserLoginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  decoded: any;
  users!:any;

  submitted = false;
  marked = false;
  theCheckbox = false;

  constructor(private authServive:AuthService, private router: Router, public fb: FormBuilder, private toast :HotToastService) { 
  }


  myForm() {
    this.UserLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [ Validators.required ]]
    });
  }

  ngOnInit(): void {
    // sessionStorage.setItem( JSON.stringify({loginName: "not yet", isLogged : "true"})); 
    this.myForm();

    this.box = document.getElementById('box');

    if (this.selected == 'Buyer') {
      this.box.style.backgroundImage = "url('../../../assets/bg.jpg')";
    }
    if (this.selected == 'Seller') {
     this.box.style.backgroundImage = "url('')";   
    }
  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.UserLoginForm.controls;
  }

  async UserLogin()
  {
    this.submitted = true;
   
      let logingDetails = {
        email: this.UserLoginForm.value.email,
        password: this.UserLoginForm.value.password
      }

      if(logingDetails.email != '' && logingDetails.password != '')
      {

        this.authServive.UserLogin(logingDetails).subscribe(async res => {
          this.decoded = jwt_decode(res.token); 

          await this.authServive.GetAllUsers().subscribe((ans:any) => {
            let result = ans;
            this.users = result.filter((ress:any) => String(ress.email) === String(this.decoded.email))

            if(this.users[0].usertype === this.selected)
            {
              if(this.users[0].usertype === 'Seller')
              {
                this.successfullToast();
                this.router.navigate(['/homes']);
              }
              if(this.users[0].usertype === 'Buyer')
              {
                this.successfullToast();
                this.router.navigate(['/home']);
              }
                
            }
            else{

              if(this.users[0].usertype === 'Admin')
              {
                this.successfullToast();
                this.router.navigate(['/admin/users']);
              }
              else{
                let msg = 'credentials does not correspond';
                this.errorToast(msg)
              }
              
            }

            sessionStorage.setItem('loggedID', this.users[0].Userid);
            if(this.marked === true)
            {
              localStorage.setItem('loggedID', this.users[0].Userid);
            }
            
          });
          // sessionStorage.setItem('loggedInToken', res.token);
          sessionStorage.setItem('loggedEmail', this.decoded.email);
          if(this.marked === true)
          {
            localStorage.setItem('loggedEmail', this.decoded.email);
          }

          this.submitted = false;
        }, (error) => {
          console.log(error)
          let msg = 'Please provide the correct credentials!';
          this.errorToast(msg);

          console.log(error);
      });        
      }
      else{
        let msg = 'Please provide credentials!';
        this.errorToast(msg)
      }
  }

  checkRemember(event:any)
  {
    this.marked = event.target.checked;
    // console.log(this.marked);
  }

  checkSelected(event:any){
    this.selected = event.target.value;
    console.log(this.selected);

    if (this.selected == 'Buyer') {
      this.box.style.backgroundImage = "url('../../../assets/bg.jpg')";
    }
    if (this.selected == 'Seller') {
      this.box.style.backgroundImage = "url('../../../assets/bulls-g7a739ebdb_1280.jpg')"; 
    }
  }

  successfullToast(){
    this.toast.success('Logged in successfully!',{duration:6000 , style: {
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
