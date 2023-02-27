import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { HotToastService } from '@ngneat/hot-toast';

// import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 selected: any = 'Buyer';
 box!: any;
  UserLoginForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  });

  decoded: any;
  users!:any;

  
  timer = localStorage.setItem("timer","1");
  submitted = false;
  marked = false;
  theCheckbox = false;

  constructor(private authServive:AuthService, private router: Router, public fb: UntypedFormBuilder,private activatedRoute: ActivatedRoute,
    private toast :HotToastService, private spinner:NgxSpinnerService, private notification: NotificationService) { 

    // this.loadScript("https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js");
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

  loadScript(url:any) { 
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    // script.async = false;
    // script.defer = true;
    body.removeChild(script);
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
        this.showSpinner();

        this.authServive.UserLogin(logingDetails).subscribe(async res => {
          this.decoded = jwt_decode(res.token); 

          await this.authServive.GetAllUsers().subscribe((ans:any) => {
            let result = ans;
            this.users = result.filter((ress:any) => String(ress.email) === String(this.decoded.email))

            if(this.users[0].usertype === this.selected)
            {
              if(this.users[0].usertype === 'Seller')
              {
                let msg = "Successful login!";
                this.notification.success(msg);
                this.router.navigate(['/homes']);
              }
              if(this.users[0].usertype === 'Buyer')
              {
                let msg = "Successful login!";
                this.notification.success(msg);
                this.router.navigate(['/home']);
              }
                
            }
            else{

              if(this.users[0].usertype === 'Admin')
              {
                let msg = "Successful login!";
                this.notification.success(msg);
                this.router.navigate(['/admin/users']);
              }
              else{
                let msg = 'credentials does not correspond';
                this.notification.danger(msg);
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
          this.notification.danger(msg);

          console.log(error);
      });        
      }
      else{
        let msg = 'Please provide credentials!';
        this.notification.danger(msg)
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

  showSpinner()
  {
    this.spinner.show();

    setTimeout(()=>{
      this.spinner.hide();
    }, 1000)

  }
}
