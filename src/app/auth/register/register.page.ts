import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(private authService: AuthService, private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('Djole', Validators.required),
      surname: new FormControl(null, Validators.required),
      location: new FormControl(null,Validators.required),
      telephone: new FormControl(+381,Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.required,Validators.minLength(7)])
    });
  }

  onRegister(){
    this.loadingCtrl
      .create({message: "Registering....."})
      .then((loadingE1)=>{
        loadingE1.present();

        this.authService.register(this.registerForm.value).subscribe(resData=>{
          console.log('Registracija je uspela');
          console.log(resData);
          loadingE1.dismiss();
          this.router.navigateByUrl('/home');
      });
    });
  }
}
