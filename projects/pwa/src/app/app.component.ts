import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AppService } from '../services/app.service';
import { environment } from '../environments/environment';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  /**
   * For right sidebar fixing
   */
  fix = false;
  scroll = new Subject();


  /**
   * For window resiznig
   */
  resize = new Subject();

  constructor(
    public a: AppService,
    private swUpdate: SwUpdate
  ) {
    console.log('AppComponent::constructor()');
    this.observeRightSidebarScroll();
    this.observeWindowResize();

    // console.log('is Admin: ', a.philgo.isAdmin());

    // a.philgo.postLoad(1694).subscribe(p => console.log('p', p));


    /**
     * Register Angular Service Worker
     * Angular Service Worker 는 Zone 이 stable 할 때 등록을 하는데, 잘 안된다. 그래서 여기서 강제로 등록한다.
     */
    if (environment.production && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration()
        .then(active => !active && navigator.serviceWorker.register('/ngsw-worker.js'))
        .catch(console.error);
    }

    /**
     * Service worker 가 업데이트 되면, (또는 뭔가가 업데이트 되면) 기존 service worker 를 업데이트한다.
     * 그래서 새로 업데이트 된 내용을 볼 수 있게 한다.
     */
    swUpdate.available.subscribe(event => {
      console.log(`Service worker is available ...`);
      swUpdate.activateUpdate().then(() => {
        console.log(`Service worker is updated. Going to reload now!`);
        window.location.reload();
      });
    });

    /**
     * Angular doc
     */
    swUpdate.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    swUpdate.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });


    // const data: AlertData = <any>{};
    // data.content = 'Oo.. this is content';
    // this.a.alert(data).then( re => console.log('then re:', re));



  }
  @HostListener('window:resize', ['$event']) onresize(event: Event) {
    this.resize.next();
  }
  observeWindowResize() {
    this.resize.pipe(
      debounceTime(100)
    ).subscribe(() => {

      // console.log('window resize. width: ', window.innerWidth);
      if (this.a.isDesktop) {
        if (window.innerWidth < 768) {
          location.reload();
        }
      } else {
        if (window.innerWidth > 768) {
          location.reload();
        }
      }
    });
  }
  @HostListener('window:scroll', ['$event']) onScroll(event: Event) {

    if (this.a.isDesktop) {
      this.scroll.next();
    }
  }
  observeRightSidebarScroll() {

    this.scroll.pipe(
      debounceTime(100)
    ).subscribe(() => {

      /**
       * Get the height of right sidebar
       */
      const right = document.querySelector('.desktop-right-sidebar');
      const rightHeight = right.getBoundingClientRect().height;

      /**
       * Get Y position of time when the bottom of right sidebar meets(scrolled over) the bottom of screen.
       */
      const positionOfRightBottomMeetScreenBottom = rightHeight - window.innerHeight;

      /**
       * Get the extra space on top
       * Top space between the very top and the top of '.desktop-center-content'
       */
      const center = document.querySelector('.desktop-center-content');
      const centerTop = center.getBoundingClientRect().top;
      const topSpace = centerTop + window.scrollY;

      /**
       * Get actuall scrolling Y position
       */
      const scrollPosition = window.scrollY - topSpace;

      if (scrollPosition > positionOfRightBottomMeetScreenBottom) {
        // console.log('fix right');
        this.fix = true;
      } else {
        // console.log('do not fix');
        this.fix = false;
      }

    });
  }

}
