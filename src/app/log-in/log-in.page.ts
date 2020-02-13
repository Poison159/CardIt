import { Component, OnInit } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage';
import { IUser } from '../User';
import { CardService } from '../Service/CardService';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  constructor(private facebook: Facebook,private router: Router,private cardService: CardService, private storage:Storage,) { }
  fbUser: any;
  private user:IUser;
  ngOnInit() {
   
  }

  loginWithFB() {
    this.facebook.login(['email', 'public_profile']).then(() => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.fbUser = {id: profile['id'],email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
        this.storage.set('user',this.fbUser);
        this.setStoredToUser();
        this.register();
        this.storage.set('user',this.user);
        this.router.navigate(['tabs']);
      }).catch((error) => {
        console.log(error);
        alert(error);
      });
    });
  }

  register(){
    this.cardService.RegisterUser(this.user.name,this.user.email,this.user.mobileNumber,this.user.id.toString())
    .subscribe(
      (returnedUser: IUser) => {
        this.user.id = returnedUser.id;
        alert(returnedUser.id.toString() + ': ' + returnedUser.email + ': ' + returnedUser.password);
      }
    )
  }

    setStoredToUser(){
      this.storage.get('user').then(
        (storedUser: any) => {
          this.user.name = storedUser.first_name;
          this.user.email = storedUser.email;
          this.user.password = storedUser.id.toString();
          this.user.mobileNumber = storedUser.mobileNumber;
        }
      ).catch(err => {
        alert('error getting stored user');
      });
    }

}
