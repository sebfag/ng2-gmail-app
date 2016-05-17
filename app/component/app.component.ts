import {Component} from '@angular/core';
import {UserService} from '../service/User.service';
import {UserModel} from '../model/User.model';

@Component({
  selector: 'gmail-app',
  template: `
        <h1>{{title}}</h1>
        <h4 *ngIf="loggedIn">{{user.email}}</h4>
        <p *ngIf="loggedIn">Total messages: {{user.totalThreads}}</p>
        <button *ngIf="!loggedIn" (click)="logIn()">Login with Google</button>
    `,
  providers: [UserService]
})
export class AppComponent {
  public title = 'Ng2 Gmail App';

  loggedIn = false;

  user:UserModel;

  constructor(private userService:UserService) {}

  logIn() {
    this.userService.authoriseAccess()
      .then(
        user => {
          this.loggedIn = this.userService.isLoggedIn();
          this.user = user;
        },
        (error) => console.log('error', error)
      );
  }

  // getData() {
  //   let self = this;
  //   if (this._gmailService.isAuth()) {
  //
  //
  //     this._gmailService.getLabels()
  //       .then(
  //         (data) => {
  //           self.list = data;
  //           self.loggedIn = true;
  //         },
  //         (error) => console.log('error', error.error)
  //       )
  //   }
  // }
}
