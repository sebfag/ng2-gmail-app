/**
 * User: jovica
 * Date: 5/17/16
 */

import {UserService} from "./User.service";
import {GmailService} from "./Gmail.service";
import {UserModel} from "../model/User.model";
import any = jasmine.any;

class GmailUserMock {
    getProfile(data:any):any {
        return {
            execute(callback:Function) {
                callback({
                    emailAddress: 'jesus.crysist@gmail.com',
                    threadsTotal: 666
                });
            }
        };
    }
}

class GmailServiceMock extends GmailService {

    auth(check:boolean):Promise<any> {
        return new Promise((resolve) => {

            this._isAuth = true;

            this.gmailClient = new GmailUserMock();

            resolve();
        });
    }
}

describe('Service', () => {

    describe('User', () => {

        let gmailServiceMock = new GmailServiceMock();

        let userService = new UserService(gmailServiceMock);

        it('should be instantiated', () => {
            expect(userService).not.toBeUndefined();
        });

        it('should be logged in', (done) => {
            userService.authoriseAccess()
                .then((user) => {
                    expect(user).toEqual(any(UserModel), 'returned user is instance of UserModel');
                    expect(userService.isLoggedIn()).toBeTruthy('user is logged in');
                    expect(userService.getUser()).not.toBeUndefined('user property exist');
                    expect(userService.getUser()).toEqual(any(UserModel), 'user property is of type UserModel');
                    done();
                })
                .catch((error) => {
                    throw Error(error);
                });
        });
    });
});
