import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-blog-category-menu',
  templateUrl: './blog-category-menu.component.html',
  styleUrls: ['./blog-category-menu.component.scss']
})
export class BlogCategoryMenuComponent implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

  moreCategories() {
    return this.a.blog.categories.slice(4);
  }

}
