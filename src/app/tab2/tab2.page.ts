import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage'
import { IUser } from '../User';
import { Router } from '@angular/router';
import { CardService } from '../Service/CardService';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public name = "Siya";
  public emnail = "Siaydebe@gmail.com";
  public fbPassword = "125784569";
  public user: any;
  constructor(private router: Router, private cardService: CardService, public loadingController: LoadingController) { }
  
  async ngOnInit() {
    console.log('Fetching from service...');
      const loading = await this.loadingController.create({
        message: 'Fetching user cards...'
      });

       this.cardService.RegisterUser(this.name,this.emnail,null,this.fbPassword)
        .subscribe((res : any) => this.user = res,
        (error) => {},
        () => {})
  }
}
