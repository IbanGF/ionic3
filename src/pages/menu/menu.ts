import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { AboutPage } from './about/about';
import { WhyPage } from './why/why';
import { ConditionPage } from './condition/condition';
import { ContactPage } from './contact/contact';
import { CommentPage } from './comment/comment';
import { LoginPage } from '../login/login';
import { SigninPage } from '../signin/signin';
import { MyprofilePage } from '../user/my-profile/my-profile';

import { AuthProvider } from '../../providers/auth/auth'

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {

  isLog: boolean;
  about = AboutPage;
  why = WhyPage;
  condition = ConditionPage;
  contact = ContactPage;
  comment = CommentPage;
  myProfile = MyprofilePage;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public toastCtrl: ToastController) { }

  ionViewWillEnter() {
    if (this.authProvider.getLogStatus()) {
      this.isLog = true;
    } else {
      this.isLog = false;
    }
  }
  goTo(elem) {
    this.navCtrl.setRoot(AboutPage);
  }

  logout() {
    this.authProvider.logout()
    this.isLog = false;
    let toast = this.toastCtrl.create({
      message: 'Vous êtes déconnecté',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  goToLogin(){
    const loginModel = this.modalCtrl.create(LoginPage);
    loginModel.onDidDismiss(data =>{
      this.isLog = data;
    });
    loginModel.present();
  }

  goToSignin(){
    const signinModal = this.modalCtrl.create(SigninPage);
    signinModal.present();
  }

}
