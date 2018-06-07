import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth'
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  email: string;
  password: string;

  private signupErrorString: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public authProvider: AuthProvider) { }


  doSignup() {
    this.authProvider.login(this.email, this.password).subscribe((resp) => {
      this.navCtrl.push(MainPage);
      let toast = this.toastCtrl.create({
        message: 'Vous êtes connecté',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
