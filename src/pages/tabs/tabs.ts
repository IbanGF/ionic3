import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { MyprofilePage } from '../user/my-profile/my-profile';

// import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
// import { Tab3Root } from '../pages';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = MyprofilePage;
  tab1Title = "Pour moi";
  tab2Root: any = Tab2Root;
  tab2Title = "Search";
  tab3Root: any = MenuPage;
  tab3Title = "Menu";
  tab4Title = "Partager";
  // tab3Root: any = Tab3Root;

  // tab1Title = " ";
  // tab3Title = " ";

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      // this.tab1Title = values['TAB1_TITLE'];
      // this.tab2Title = values['TAB2_TITLE'];
      // this.tab3Title = values['TAB3_TITLE'];
    });
  }
}
