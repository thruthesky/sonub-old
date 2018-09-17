import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPushNotificationComponent } from './request-push-notification.component';

describe('RequestPushNotificationComponent', () => {
  let component: RequestPushNotificationComponent;
  let fixture: ComponentFixture<RequestPushNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPushNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPushNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
