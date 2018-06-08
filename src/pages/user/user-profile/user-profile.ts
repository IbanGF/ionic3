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

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public userProvider: User) { }

  guestCommentsModal() {
    let guestCommentsModal = this.modalCtrl.create("GuestCommentsPage");
    guestCommentsModal.present();
  }

  hostCommentsModal() {
    let hostCommentsModal = this.modalCtrl.create("HostCommentsPage");
    hostCommentsModal.present();
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
        this.userProvider.setGuestComments(data);
      }, err => {
        console.log(err);
      });

    this.userProvider.getHostComments(this.navParams.get('id'))
      .subscribe(data => {
        this.guestComments = data;
        this.userProvider.setHostComments(data);
      }, err => {
        console.log(err);
      });

  }
}
