import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-layout';

  @HostListener('scroll', ['$event'] ) onScroll(event: Event) {
    console.log(event);
  }
  @HostListener('click', ['$event'] ) onClick(event: Event) {
    console.log(event);
  }
}
