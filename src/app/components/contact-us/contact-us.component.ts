import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { NotificationService } from './notification.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {


  constructor(private fb: FormBuilder) {}
 
  contactForm = this.fb.group({
    sender: [''],
    email: [''],
    message: [''],
  })
 
 
  ngOnInit(): void {}
 
  onSubmit(contactForm: any) {
    console.log(contactForm)
    // this.contact.PostMessage(FormData)
    //   .subscribe(response => {
    //     location.href = 'https://mailthis.to/confirm'
    //     console.log(response)
    //   }, error => {
    //     console.warn(error.responseText)
    //     console.log({ error })
    //   })
  }
}

// FormData: FormGroup;
// constructor(private builder: FormBuilder, private contact: ServicesService) { }

// ngOnInit() {
//   this.FormData = this.builder.group({
//     Fullname: new FormControl('', [Validators.required]),
//     Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
//     Comment: new FormControl('', [Validators.required])
//   });
// }


// onSubmit(FormData) {
//   console.log(FormData)
//   this.contact.PostMessage(FormData)
//     .subscribe(response => {
//       location.href = 'https://mailthis.to/confirm'
//       console.log(response)
//     }, error => {
//       console.warn(error.responseText)
//       console.log({ error })
//     })
// }
// }