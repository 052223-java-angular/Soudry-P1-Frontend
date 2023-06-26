import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationObject } from 'src/app/interfaces/registration-object';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  failure: boolean = false;
  preSubmit: boolean = true;
  errorMessage : any

  constructor(private service: ServiceService) {}

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', Validators.required)
  });


// for form control
  get f(){
    return this.form.controls;
}

  onSubmit() {
  let u : String | null =  this.form.controls.username.value
  let v : String | null =  this.form.controls.password.value
  let m : String | null =  this.form.controls.confirmPassword.value
  let p : String | null =  this.form.controls.email.value
  if (u != null && v != null && m != null && p != null) {
    const jsonObject : RegistrationObject = {
      username: u,
      password: v,
      confirmPassword: m,
      email: p
     }

    this.service.register(jsonObject).subscribe( 
      {
        next: (value : any) => {
          this.preSubmit = false;
            },
            error: error => {
              let e = error.error.message;
                     console.log(e);
              this.errorMessage = e;
              this.failure = true;
            }
          }

      ) 
    }
  }}