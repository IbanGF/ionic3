import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html',
})
export class FiltersPage {

  price: any = { lower: 0, upper: 2000 };
  engagement: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltersPage');
  }

  saveFilters(){
    this.viewCtrl.dismiss();
  }

  toggleEngagement(engagement){
    if(this.engagement == engagement) this.engagement = "";
    else this.engagement = engagement;
    console.log('llll')
  }

}
