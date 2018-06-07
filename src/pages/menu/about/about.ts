import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  tabStyle: any;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    this.tabStyle = document.getElementsByClassName("show-tabbar");
    this.tabStyle[0].style.display = "none";
  }

  ionViewWillLeave() {
    this.tabStyle[0].style.display = "flex";
  }

}
