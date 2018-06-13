import { Component, OnInit } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../../providers/user/user';
import { AuthProvider } from '../../../providers/auth/auth';
import { UserData } from '../../../models/userdata';
import moment from 'moment';

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyprofilePage implements OnInit {
  user: any = false;
  guestComments: any = false;
  hostComments: any = false;
  places: any = false;
  spots: any = false;
  favPlaces: Array<any>;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public userProvider: User, public authProvider: AuthProvider) {

  }

  IonViewCanEnter() {
    return this.authProvider.getLogStatus();
  }

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

  favoritePlacesModal(){
    let favPlacesModal = this.modalCtrl.create("FavoritePlaces", { places: this.favPlaces });
    favPlacesModal.present();
  }

  ngOnInit() {
    this.user = this.userProvider.getUserData();
    if(this.user) {
      this.user.creation = moment(this.user.creation).format('MMM YYYY');

      this.userProvider.getHostComments(this.user._id)
        .subscribe(data => {
          this.hostComments = data;
        }, err => {
          console.log(err);
        });

      this.userProvider.getGuestComments(this.user._id)
        .subscribe(data => {
          this.guestComments = data;
        }, err => {
          console.log(err);
        });

      this.userProvider.getUserPlaces(this.user._id)
        .subscribe( (data:any) => {
          if(data && data.length) this.places = data.filter(place => place.isActive && place.finished);
        }, err => {
          console.log(err);
        });

      this.userProvider.getUserSpots(this.user._id)
        .subscribe( (data:any) => {
          this.spots = data;
        }, err => {
          console.log(err);
        });

        this.userProvider.getFavoritesForUser()
        .subscribe(data =>{
          this.favPlaces = data[0];
        })
    }


  }

}
