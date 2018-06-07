import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
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
  facebookAccessToken: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public authProvider: AuthProvider, public fb: Facebook) { }


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
      let toast = this.toastCtrl.create({
        message: 'Une erreur est survenue pendant la connection',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
  doFbSignup() {
    this.fb.login(['public_profile', 'email'])
      .then(res => {
        // if(res.status === "connected") {
        return this.facebookAccessToken = res.authResponse.accessToken;
      })
      .then(res => {
        this.authProvider.loginFb(this.facebookAccessToken)
          .subscribe(res => {
            this.navCtrl.push(MainPage);
            let toast = this.toastCtrl.create({
              message: 'Vous êtes connecté',
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }, (err) => {
            this.navCtrl.push(MainPage);
            let toast = this.toastCtrl.create({
              message: 'Une erreur est survenue pendant la connection',
              duration: 3000,
              position: 'top'
            });
            toast.present();
          })
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }
}
