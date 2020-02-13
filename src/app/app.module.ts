import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {IonicStorageModule} from '@ionic/storage';
import { CardService } from './Service/CardService';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModalPagePageModule } from './modal-page/modal-page.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    ModalPagePageModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    BarcodeScanner,
    SplashScreen,
    CardService,
    Facebook,
    HttpClient,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
