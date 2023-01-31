import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  
    constructor(private router: Router,private route: ActivatedRoute, private authservice: AuthService, private fb: FormBuilder) { }
  
    EditUserForm:FormGroup = new FormGroup({
      fullname:new FormControl(''),
      email:new FormControl(''),
      phone:new FormControl(''),
      address:new FormControl(''),
      identity:new FormControl(''),
      agric:new FormControl(''),
      status:new FormControl('')
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
              identity: this.users[0].address,
              agric: this.users[0].address,
              status: this.users[0].status,
            })
          }
      })
  
    }
  
    updateUser(){
      
  
      let userDetails= {
        fullname: this.EditUserForm.value.fullname,
        email: this.EditUserForm.value.email,
        phone: this.EditUserForm.value.phone,
        address: this.EditUserForm.value.address,
        identity: this.EditUserForm.value.address,
        agric: this.EditUserForm.value.address,
        status: this.EditUserForm.value.status,
        usertype: this.users[0].usertype
      }
  

     
     
      // this.authservice.updateUser(this.uid, userDetails).subscribe((next) => {
      //   // console.log('Successfully Updated!');
      //   // this.router.navigate(['/admin/users']);
      // });
    }
  
  }