import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { AuthProvider } from '../../providers/auth/auth'
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  email: string;
  password: string;
  confirmPassword: string;
  lastName: string;
  firstName: string;
  facebookAccessToken: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public authProvider: AuthProvider, public fb: Facebook) { }

  doFbSignin(){
    this.fb.login(['public_profile', 'email'])
      .then(res => {
        return this.facebookAccessToken = res.authResponse.accessToken;
      })
      .then(res => {
        this.authProvider.loginFb(this.facebookAccessToken)
          .subscribe(res => {
            this.navCtrl.pop();
            let toast = this.toastCtrl.create({
              message: 'Vous êtes connecté',
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }, (err) => {
            this.navCtrl.pop();
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

  doSignin(){
    let data = {identity:{firstName: this.firstName, lastName: this.lastName}, email: this.email, password: this.password, passwordConfirm: this.confirmPassword};
    this.authProvider.signIn(data, '').subscribe((resp)=>{
          let toast = this.toastCtrl.create({
            message: 'Veuillez vérifier vos mails pour confirmer votre inscription !',
            duration: 3000,
            position: 'top'
          });
          toast.present();
    }, err=>{
      console.log(err);
    })
  }

}
