/**
 * User: jovica
 * Date: 5/16/16
 */
import {Injectable} from '@angular/core';

declare var gapi:any;

@Injectable()
export class GmailService {

  private CLIENT_ID = '1060923063605-u2inknrbkameh9hltc10ha8df7smk4ik.apps.googleusercontent.com';
  private SCOPE = 'https://mail.google.com/';

  constructor() {}

  private gmailClient:any;

  private _isAuth = false;

  auth(check:boolean = false):Promise<any> {

    return new Promise((resolve, reject) => {

      gapi.auth.authorize({
        'client_id': this.CLIENT_ID,
        'scope': this.SCOPE,
        'immediate': check
      }, (result:any) => {
        if (result && !result.error) {
          this._isAuth = true;

          gapi.client.load('gmail', 'v1', () => {
            this.gmailClient = gapi.client.gmail.users;

            resolve();
          });
        } else {
          reject(result || result.error);
        }
      });
    });
  }

  isAuth():boolean {
    return this._isAuth;
  }

  getGmailApi():any {
    return this.gmailClient;
  }
}
