import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { VoyageurPage } from './voyageur/voyageur';
import { HotePage } from './hote/hote';
import { PartagerPage } from './partager/partager';
import { ReserverPage } from './reserver/reserver';

@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  voyageur = VoyageurPage;
  hote = HotePage;
  partager = PartagerPage;
  reserver = ReserverPage;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

}
