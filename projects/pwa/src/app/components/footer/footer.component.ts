import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';


@Component({
  selector: 'app-mobile-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

  onClickSonub( event: Event ) {
    event.preventDefault();
    this.a.openRootSite();
    if ( this.a.inRootSite ) {
      this.a.openHome();
    } else {
      this.a.openRootSite();
    }
    return false;
  }

}
