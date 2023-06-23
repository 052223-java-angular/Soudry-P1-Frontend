import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/interfaces/login'; 
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service: ServiceService, private router: Router) {}

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  get f(){
    return this.form.controls;
}

onSubmit() {
  let u : String | null =  this.form.controls.username.value
  let v : String | null =  this.form.controls.password.value
  if (u != null && v != null) {
    const jsonObject : Login = {
      username: u,
      password: v,
     }
    this.service.login(jsonObject);
    this.router.navigateByUrl('/landing')
  }
  }
}
