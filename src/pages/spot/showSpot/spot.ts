import { Component, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform, Content, ModalController } from 'ionic-angular';
import { LoginPage } from '../../../pages/login/login'

import { SpotsProvider, PlacesProvider, AuthProvider, User } from '../../../providers/providers';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';

@IonicPage()
@Component({
  selector: 'page-spot',
  templateUrl: 'spot.html',
})
export class SpotPage implements OnDestroy {
  @ViewChild(Content) content: Content;
  spot: any;
  comments: any;
  spotsNearBy: any;
  placesNearBy: any;
  showNavbar: boolean = false;
  sliderHeight: number = 0;
  scrolled: boolean = false;
  favorite: boolean;
  imageChange$ = new Subject();
  defaultImage: any;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(public modalCtrl: ModalController, public userProvider: User, public authProvider: AuthProvider, public appCtrl: App, public navCtrl: NavController, private zone: NgZone, public spotsProvider: SpotsProvider, public placesProvider: PlacesProvider, public navParams: NavParams, public platform: Platform) {
    this.sliderHeight = this.platform.height() * 0.4 + 40;
  }

  showUser(id) {
    this.appCtrl.getRootNav().push('UserProfilePage', { id: id });
  } auth

  slideChanged() {
    this.imageChange$.next(1000);
  }

  scrolledToggle() {
    this.zone.run(() => {
      this.scrolled = true;
    });
  }

  ionViewDidLoad() {
    this.spotsProvider.getOneSpot(this.navParams.get('spotSlug'))
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.spot = data;
        this.defaultImage = "'https://test.sportihome.com/uploads/places/'" + this.spot._id + '/large/' + this.spot.pictures[0];
        this.spotsProvider.getComments(this.spot._id)
          .takeUntil(this.ngUnsubscribe)
          .subscribe(comments => this.comments = comments);

        this.placesProvider.getPlacesNearBy(this.spot.loc.coordinates, 50000)
          .takeUntil(this.ngUnsubscribe)
          .subscribe(placesNearBy => this.placesNearBy = placesNearBy);

        this.spotsProvider.getSpotsNearBy(this.spot.loc.coordinates, 50000)
          .takeUntil(this.ngUnsubscribe)
          .subscribe(spotsNearBy => this.spotsNearBy = spotsNearBy);
      });
  }

  setFavoriteStatus(event, placeId) {
    event.preventDefault();
    event.stopPropagation();
    if (this.authProvider.getLogStatus() === true) {
      if (this.userProvider.isFavoritePlace(placeId) === false) {
        this.favorite = true;
        this.userProvider.addPlaceFavorite(placeId)
          .takeUntil(this.ngUnsubscribe)
          .subscribe();
      } else {
        this.favorite = false;
        this.userProvider.removePlaceFavorite(placeId)
          .takeUntil(this.ngUnsubscribe)
          .subscribe();
      }
    } else {
      let loginModal = this.modalCtrl.create(LoginPage);
      loginModal.present();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
