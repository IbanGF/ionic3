import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPage } from './menu';
import { AboutPage } from './about/about';
import { WhyPage } from './why/why';
import { ContactPage } from './contact/contact';
import { CommentPage } from './comment/comment';
import { VoyageurPage } from './comment/voyageur/voyageur';
import { HotePage } from './comment/hote/hote';
import { PartagerPage } from './comment/partager/partager';
import { ReserverPage } from './comment/reserver/reserver';
import { ConditionPage } from './condition/condition';
import { AssurancesPage } from './condition/assurances/assurances';
import { CguPage } from './condition/cgu/cgu';
import { LegalPage } from './condition/legal/legal';
import { AnnulationPage } from './condition/annulation/annulation';
import { SignupPage } from '../signup/signup';


@NgModule({
  declarations: [
    MenuPage,
    AboutPage,
    WhyPage,
    ContactPage,
    CommentPage,
    ConditionPage,
    AssurancesPage,
    VoyageurPage,
    PartagerPage,
    ReserverPage,
    HotePage,
    CguPage,
    LegalPage,
    AnnulationPage,
    SignupPage
  ],
  imports: [
    IonicPageModule.forChild(MenuPage),
  ],
  entryComponents: [
    MenuPage,
    AboutPage,
    WhyPage,
    ContactPage,
    CommentPage,
    ConditionPage,
    AssurancesPage,
    VoyageurPage,
    PartagerPage,
    ReserverPage,
    HotePage,
    CguPage,
    LegalPage,
    AnnulationPage,
    SignupPage
  ]
})
export class MenuPageModule {}
