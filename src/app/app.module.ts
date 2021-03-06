import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { JwtInterceptor } from '../helpers/jwt.interceptor';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { GoogleMaps } from '@ionic-native/google-maps';
import { Ionic2RatingModule } from 'ionic2-rating';
import { MenuPageModule } from '../pages/menu/menu.module';
import { LoginPageModule } from '../pages/login/login.module';
import { SigninPageModule } from '../pages/signin/signin.module';

import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { PlacesProvider, SpotsProvider, SearchProvider, AuthProvider } from '../providers/providers';
import { MyApp } from './app.component';
import { ComponentsModule } from '../components/components.module';



// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    MenuPageModule,
    LoginPageModule,
    SigninPageModule,
    HttpClientModule,
    LazyLoadImageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      tabsHideOnSubPages: true,
      scrollAssist: false,
      autoFocusAssist: false
    }),
    Ionic2RatingModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    GoogleMaps,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PlacesProvider,
    SpotsProvider,
    SearchProvider,
    AuthProvider,
    Facebook,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
