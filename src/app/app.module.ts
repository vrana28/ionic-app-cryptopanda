import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HomePage} from './home/home.page';
import {DataService} from './data.service';
import {HttpClientModule} from '@angular/common/http';
import {LogInPage} from "./auth/log-in/log-in.page";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide: DataService},{provide: LogInPage}],
  bootstrap: [AppComponent]
})
export class AppModule {}
