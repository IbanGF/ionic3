import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutPage } from './about/about';
import { WhyPage } from './why/why';
import { ConditionPage } from './condition/condition';
import { ContactPage } from './contact/contact';
import { CommentPage } from './comment/comment';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {

  about = AboutPage;
  why = WhyPage;
  condition = ConditionPage;
  contact = ContactPage;
  comment = CommentPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goTo(elem) {
    this.navCtrl.setRoot(AboutPage);
  }

}
