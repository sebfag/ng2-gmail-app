import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './component/app.component';
import {GmailService} from './service/Gmail.service';

bootstrap(AppComponent, [GmailService]);
