import { Component, OnInit } from '@angular/core';
import { CardService } from '../Service/CardService';
import { LoadingController, ModalController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
  shops: any[];
  chosenShop:any;
  encodedData: any;
  userId: any;
  constructor(private caredService: CardService,
    public modalController: ModalController, 
    private loadingController: LoadingController,
    private barcodeScanner: BarcodeScanner,
    private storage:Storage,
    private cardService: CardService) { }

  async ngOnInit() {
    this.storage.get('user').then(storedUser => {
        this.userId = storedUser.id;
    });
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  chooseShop(id){
    this.chosenShop = this.shops.filter(x => x.id === id)[0];
    alert(this.chosenShop.name);
  }

  scan(shopName: string) {
    this.barcodeScanner.scan().then(barcodeData => {
      alert(barcodeData.text);
      this.sendTodatabase(shopName,barcodeData.text,this.userId);
     }).catch(err => {
         alert(err);
     });
  }  
  sendTodatabase(shopName: string, cardNumber: string, userId: any) {
    this.cardService.saveCard(shopName, cardNumber,userId);
    this.dismiss();
  }
  encode(data: string) {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, data).then(res => {
      this.encodedData = res;
      alert('scan completed');
    });
  }

}
