import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CguPage } from './cgu/cgu';
import { AssurancesPage } from './assurances/assurances';
import { LegalPage } from './legal/legal';
import { AnnulationPage } from './annulation/annulation';

@Component({
  selector: 'page-condition',
  templateUrl: 'condition.html',
})
export class ConditionPage {
  cgu = CguPage;
  assurances = AssurancesPage;
  legal = LegalPage;
  annulation = AnnulationPage;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConditionPage');
  }
}
