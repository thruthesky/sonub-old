import { Component, OnInit } from '@angular/core';
import { AppService } from 'projects/pwa/src/services/app.service';

@Component({
  selector: 'app-request-push-notification',
  templateUrl: './request-push-notification.component.html',
  styleUrls: ['./request-push-notification.component.scss']
})
export class RequestPushNotificationComponent implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }


  /**
   * 매번 실행시 호출 하면 되지만, 맨 처음에는 rooms 페이지에서 한번 물어 보고 한다.
   */
  requestWebPushPermission() {
    // const messaging = this.a.firebase.messaging();
    // console.log('requestPushNotificationPermission()');
    this.a.messaging.requestPermission().then(() => {
      console.log('   ===> Notification permission granted.');
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // Callback fired if Instance ID token is updated.
      this.a.messaging.getToken().then(token => {
        this.a.philgo.updatePusTokenToServer(token).subscribe(res => {
          console.log('updatePushTokenToServer: ', res);
        });
      })
        .catch((err) => {
          console.log('requestWebPushPermission() => getToken() error: ', err);
        });
      this.a.messaging.onTokenRefresh(() => {
        this.a.messaging.getToken().then((token => this.a.philgo.updatePusTokenToServer(token)))
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

