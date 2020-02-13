import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController, LoadingController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { CardService } from '../Service/CardService';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  
  private cards: any[];
  private shops: any[];
  private chosenShop: any;
  
  private errMessage: string;
  constructor(private barcodeScanner: BarcodeScanner,
              public modalController: ModalController,
              private caredService: CardService, 
              private loadingController: LoadingController) {}

  ngOnInit(): void {
    this.getShops();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPagePage,
      componentProps: {
        shops: this.shops,
      }
    });
    return await modal.present();
  }

  async getShops(){
    this.chosenShop = null;
    console.log('Fetching from service...');
    const loading = await this.loadingController.create({
      message: 'Fetching Shops...'
    });
    loading.present();
    this.caredService.getMerchants()
    .subscribe(
      (data:any) => this.shops = data,
      (err: any) => {
        console.log(err);
        loading.dismiss();
      },
      () => {
        console.log('All done getting Shops');
        loading.dismiss();
      }
    );
  }
}
