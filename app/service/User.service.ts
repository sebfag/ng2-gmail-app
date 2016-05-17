/**
 * User: jovica
 * Date: 5/16/16
 */
import {Injectable} from '@angular/core';
import {GmailService} from './Gmail.service';
import {UserModel} from '../model/User.model';

@Injectable()
export class UserService {

    gmailApi:any;

    private loggedIn:boolean = false;
    private user:UserModel;

    constructor(private gmailService:GmailService) {
    }

    authoriseAccess():Promise<UserModel> {
        return this.gmailService.auth()
            .then(() => {
                let gmailApi = this.gmailApi = this.gmailService.getGmailApi();

                this.loggedIn = true;

                return new Promise((resolve, reject) => {
                    let request = gmailApi.getProfile({userId: 'me'});

                    request.execute((response:any) => {
                        if (result && !result.error) {
                            let user = new UserModel(response.emailAddress, response.threadsTotal);
                            this.user = user;
                            console.log(user);
                            resolve(user);
                        } else {
                            reject(response.error);
                        }
                    });
                });
            });
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    getUser() {
        return this.user;
    }
}
