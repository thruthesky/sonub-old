import { Component } from '@angular/core';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.service';
import { AppService } from '../../services/app.service';
import { AngularLibrary } from '../../modules/angular-library/angular-library';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  _ = AngularLibrary;
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) {

    // philgo.debug = true;
    philgo.app('sonub.frontPage').subscribe(res => {
      console.log('sonub.frontPage()', res);
    }, e => this.a.toast(e));
  }


  /**
   * 매번 실행시 호출 하면 되지만, 맨 처음에는 rooms 페이지에서 한번 물어 보고 한다.
   */
  requestWebPushPermission() {
    // const messaging = this.a.firebase.messaging();
    // console.log('requestPushNotificationPermission()');
    this.a.messaging.requestPermission().then(() => {
      // console.log('   ===> Notification permission granted.');
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // Callback fired if Instance ID token is updated.

      this.a.messaging.getToken().then(token => {
        this.philgo.updatePusTokenToServer(token);
      })
        .catch((err) => {
          // console.log('getToken() error: ', err);
        });
      this.a.messaging.onTokenRefresh(() => {
        this.a.messaging.getToken().then((token => this.philgo.updatePusTokenToServer(token)))
          .catch((err) => {
            // console.log('Unable to retrieve refreshed token ', err);
            // showToken('Unable to retrieve refreshed token ', err);
          });
      });
    }).catch((err) => {
      // console.log('Unable to get permission to notify. User may have denied permission!', err);
    });
  }

}
