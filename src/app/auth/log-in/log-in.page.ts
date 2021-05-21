import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  isLoading = false;
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('djole@gmail.com', [Validators.required,Validators.email]),
      password: new FormControl('djole1234', [Validators.required,Validators.minLength(7)])
    });
  }

  onLogIn(logInForm: NgForm){
    this.isLoading = true;

    console.log(logInForm);
    if(logInForm.valid){
      this.authService.logIn(logInForm.value).subscribe(resData=>{
        console.log('Prijava je uspesna');
        console.log(resData);
        this.isLoading = false;
        this.router.navigateByUrl('/home');
      });
    }
  }

}
