import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  public static idCurrent:string;
  public static uName: string;
  public static uLocation:string;
  public static uTelephone:number;
  isLoading = false;
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router:Router, private alertCtrl: AlertController) { }

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
        LogInPage.idCurrent=resData.localId;
        LogInPage.uName=resData.name;
        LogInPage.uLocation = resData.location;
        LogInPage.uTelephone = resData.telephone;
        this.isLoading = false;
        this.router.navigateByUrl('/home');
      },
        errRes =>{
          console.log(errRes);
          this.isLoading = false;
          let message = 'Incorrect email or password!';

          this.alertCtrl.create({
            header: 'Authenticated failed',
            message,
            buttons: ['Okay']
          }).then((alert)=>{
            alert.present();
          });

          logInForm.reset();
        });
    }
  }

}
