import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { IUser } from '../User';

export class CardService {
    private _userRegistration           = 'https://carditwebapp.conveyor.cloud/api/RegisterUser';
    private _userLogin                  = 'https://carditwebapp.conveyor.cloud/api/GetUserLogin';
    private _mechants                   = 'https://carditwebapp.conveyor.cloud/api/GetMerchants';
    private _addCard                    = 'https://carditwebapp.conveyor.cloud/api/AddCard';
    
    constructor(private _http: HttpClient){}
    RegisterUser(name: string, email: string,mobileNumber: string,password: string): Observable<IUser> {
        console.log('register user.....');
        return this._http.get<IUser>(this._userRegistration + '?name=' + name + '&email=' + email 
                                        +'&mobileNumber=' + mobileNumber + '&password=' + password);
    }

    logIn(name:string, email:string, mobileNumber:string,password:string){
        console.log('loggin in ...');
        return this._http.get<IUser>(this._userLogin + '?name=' +name + '&email=' + email + '&mobileNumber='+ 
                                    mobileNumber + '&password'+ password);
    }

    getMerchants(){
        console.log('getting merchants ...');
        return this._http.get<any>(this._mechants)
    }

    saveCard(merchantName:string, cardNumber:string, userId:string){
        console.log('loggin in ...');
        return this._http.get<IUser>(this._addCard + '?merchantName=' + merchantName + '&cardNumber=' + cardNumber
                                     + '&userId='+ userId);
    }
}

