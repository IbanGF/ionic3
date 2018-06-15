import { Component, OnInit } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../../providers/user/user';
import { AuthProvider } from '../../../providers/auth/auth';
import { SearchProvider } from '../../../providers/search/search';
import { SpotsProvider } from '../../../providers/spots/spots';
import { PlacesProvider } from '../../../providers/places/places';
import { UserData } from '../../../models/userdata';
import moment from 'moment';

@IonicPage()
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
  favSpots: Array<any>;
  selectedSecondaryTab: string;
  exploreHobbies = ['randonnee', 'vtt', 'parapente', 'equitation',  'kitesurf', 'ski'];
  exploreHobbiesLabel = ['Randonnée', 'VTT', 'Parapente', 'Equitation', 'Kitesurf', 'Ski'];
  statsSpot = [];
  statsPlace = [];

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public userProvider: User, public authProvider: AuthProvider, public searchProvider: SearchProvider, public spotsProvider: SpotsProvider, public placesProvider: PlacesProvider) {}

  IonViewCanEnter() {
    return this.authProvider.getLogStatus();
  }

  guestCommentsModal() {
    let guestCommentsModal = this.modalCtrl.create("GuestCommentsPage", { guestComments: this.guestComments });
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
    let favPlacesModal = this.modalCtrl.create("AnnoncesPage", { places: this.favPlaces });
    favPlacesModal.present();
  }

  favoriteSpotsModal(){
    let favSpotsModal = this.modalCtrl.create("SpotsUserPage", { spots: this.favSpots });
    favSpotsModal.present();
  }

  segmentChanged() {
    this.searchProvider.setSelectedSecondaryTab(this.selectedSecondaryTab);
  }

  isFavoritePlace(place) {
    if (this.authProvider.getLogStatus() === true) return this.userProvider.isFavoritePlace(place);
    else return false;
  }

  ngOnInit() {
      this.user = this.userProvider.getUserData();
      this.selectedSecondaryTab = this.searchProvider.getSelectedSecondaryTab();
      if(this.user) {
          this.user.creation = moment(this.user.creation).format('MMM YYYY');

          this.userProvider.getHostComments(this.user._id)
            .subscribe(data => {
              this.hostComments = data;
            });

          this.userProvider.getGuestComments(this.user._id)
            .subscribe(data => {
              this.guestComments = data;
            });

          this.userProvider.getUserPlaces(this.user._id)
            .subscribe( (data:any) => {
              if(data && data.length) this.places = data.filter(place => place.isActive && place.finished);
            });

          this.userProvider.getUserSpots(this.user._id)
            .subscribe( (data:any) => {
              this.spots = data;
            });

          this.userProvider.getFavoritesForUser()
          .subscribe(data =>{
            this.favPlaces = data[0];
            this.favSpots = data[1];
          })

          this.spotsProvider.getHobbyStats(this.exploreHobbies)
          .subscribe((data: any) =>{
            data.forEach((spotSportCount) => {
              this.statsSpot[this.exploreHobbies.indexOf(spotSportCount._id)] = spotSportCount.count;
            });
          })

          this.placesProvider.getHobbyStats(this.exploreHobbies)
          .subscribe((data: any) =>{
            data.forEach((placeSportCount) => {
              this.statsPlace[this.exploreHobbies.indexOf(placeSportCount._id)] = placeSportCount.count;
            });
          })
      }
  }

}
