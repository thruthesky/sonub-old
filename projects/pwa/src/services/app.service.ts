import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleLibrary as _ } from 'ng-simple-library';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  isMobile = true;
  isDesktop = false;
  constructor(
    private router: Router
  ) {
    if ( _.md() ) {
      this.isDesktop = true;
      this.isMobile = false;
    } else {
      this.isDesktop = false;
      this.isMobile = true;
    }
  }


  openHome() {
    this.router.navigateByUrl('/');
  }
}
