import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { AboutPage } from './about/about';
import { WhyPage } from './why/why';
import { ConditionPage } from './condition/condition';
import { ContactPage } from './contact/contact';
import { CommentPage } from './comment/comment';
import { SignupPage } from '../signup/signup';
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
  login = SignupPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public toastCtrl: ToastController) {}

  ionViewWillEnter(){
    if(this.authProvider.getLogStatus()){
      this.isLog = true;
    }else{
      this.isLog = false;
    }
  }
  goTo(elem) {
    this.navCtrl.setRoot(AboutPage);
  }

  logout(){
    this.authProvider.logout()
    this.isLog= false;
    let toast = this.toastCtrl.create({
      message: 'Vous êtes déconnecté',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
