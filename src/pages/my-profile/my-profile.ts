import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { AuthProvider } from '../../providers/auth/auth';
import { UserData } from '../../models/userdata';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyprofilePage implements OnInit {
  userData: UserData;
  user: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: User, public authProvider: AuthProvider, public http: HttpClient) { }

  IonViewCanEnter() {
    return this.authProvider.getLogStatus();
  }

  ngOnInit() {
    this.userData = this.userProvider.getUserData();
    // this.userProvider.getMe()
    // .subscribe(res =>{
    //   console.log(res);
    //   return this.userData = res;
    // }, err=>{
    //   console.log("pas d'utilisateur trouvé");
    // })
  }

}
