import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AppService } from '../services/app.service';

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
    public a: AppService
  ) {
    console.log('AppComponent::constructor()');
    this.observeRightSidebarScroll();
    this.observeWindowResize();

    // console.log('is Admin: ', a.philgo.isAdmin());

    // a.philgo.postLoad(1694).subscribe(p => console.log('p', p));

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
