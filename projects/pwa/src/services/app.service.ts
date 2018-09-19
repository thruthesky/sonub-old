import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleLibrary as _ } from 'ng-simple-library';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private router: Router
  ) { }


  openHome() {
    this.router.navigateByUrl('/');
  }

  /**
   * Don't do it with getter since it will cost a lot of accessing.
   */
  md() {
    return _.md();
  }

}
