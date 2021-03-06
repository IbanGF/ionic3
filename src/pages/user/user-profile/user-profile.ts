import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../../providers/user/user';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  user: any = false;
  guestComments: any = false;
  hostComments: any = false;
  places: any = false;
  spots: any = false;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public userProvider: User) { }

  guestCommentsModal() {
    let guestCommentsModal = this.modalCtrl.create("GuestCommentsPage", {guestComments: this.guestComments});
    guestCommentsModal.present();
  }

  hostCommentsModal() {
    let hostCommentsModal = this.modalCtrl.create("HostCommentsPage", { hostComments: this.hostComments });
    hostCommentsModal.present();
  }

  annoncesModal() {
    let annoncesModal = this.modalCtrl.create("AnnoncesPage", { places: this.places });
    annoncesModal.present();
  }

  spotModal() {
    let spotModal = this.modalCtrl.create("SpotsUserPage", { spots: this.spots });
    spotModal.present();
  }

  ionViewDidLoad(): any {
    this.userProvider.getOne(this.navParams.get('id'))
      .subscribe(data => {
        this.user = data;
        this.user.creation = moment(this.user.creation).format('MMM YYYY')
      }, err =>{
        console.log(err);
      });

    this.userProvider.getGuestComments(this.navParams.get('id'))
      .subscribe(data => {
        this.guestComments = data;
      }, err => {
        console.log(err);
      });

    this.userProvider.getHostComments(this.navParams.get('id'))
      .subscribe(data => {
        this.hostComments = data;
      }, err => {
        console.log(err);
      });

    this.userProvider.getUserPlaces(this.navParams.get('id'))
      .subscribe( (data:any) => {
        if(data && data.length) this.places = data.filter(place => place.isActive && place.finished);
      }, err => {
        console.log(err);
      });

    this.userProvider.getUserSpots(this.navParams.get('id'))
      .subscribe( (data:any) => {
        this.spots = data;
      }, err => {
        console.log(err);
      });

  }
}
