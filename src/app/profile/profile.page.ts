import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import firebase from "firebase";
import {User} from "../auth/user.model";
import {LogInPage} from "../auth/log-in/log-in.page";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;
  name: string;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.name = LogInPage.uName;

  }

}
