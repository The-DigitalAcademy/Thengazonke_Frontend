import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.service';
import { Email } from '../model/email';
import { FormBuilder, AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  form: FormGroup = new FormGroup({
    to: new FormControl(''),
    subject: new FormControl(''),
    message: new FormControl(''),

  });

  submitted = false;

  constructor(private email:EmailService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        subject: ['', Validators.required],
        message: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        to: ['', [Validators.required, Validators.email]],

      }
    );
  }



  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // if (this.form.invalid) {
    //   return;
    // }

    this.email.sendEmail(this.form.value).subscribe((res)=>{
      console.log(res);
    })

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


}
