import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  encodedData: any;
  constructor(private barcodeScanner: BarcodeScanner) {}
  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.encode(barcodeData.text);
     }).catch(err => {
         alert(err);
     });
  }
  encode(data: string) {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, data).then(res => {
      this.encodedData = res;
      alert('scan completed');
    });
  }
}
