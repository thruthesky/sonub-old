import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  template: `Redirecting ...`
})
export class RedirectComponent implements OnInit {
  constructor(
    public activatedRoute: ActivatedRoute,
    public route: Router
  ) {
    activatedRoute.queryParamMap.subscribe(re => {
      console.log('Redirecting to: ', re.get('url'));
      this.route.navigateByUrl(re.get('url'));
    });
  }

  ngOnInit() {
  }

}
