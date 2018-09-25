import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ActivatedRoute } from '@angular/router';
import { ApiPostSearch, ApiForum, ApiPost, ApiBlogSettings, PhilGoApiService } from 'share/philgo-api/philgo-api.service';
import { InfiniteScrollService } from 'share/philgo-api/infinite-scroll';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit, AfterViewInit, OnDestroy {

  forum: ApiForum = null;
  posts: Array<ApiPost> = [];
  category;

  /**
   * Post view
   */
  idxView;
  postView: ApiPost;

  /**
   * Page navigation
   */
  post_id = '';
  page_no = 1;
  limit = 5;
  noMorePosts = false;



  /**
   *
   */
  forumLoaded = false;
  loading = false;


  /**
   *
   */
  infiniteScrollSubscription;



  //
  constructor(
    private activatedRoute: ActivatedRoute,
    public a: AppService,
    public philgo: PhilGoApiService,
    private scroll: InfiniteScrollService
  ) {
    philgo.blogChange.subscribe((blog: ApiBlogSettings) => {
      if (blog) {
        this.initBlogPageLoad();
      }
    });

  }

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.infiniteScrollSubscription = this.scroll.watch('section.blog-list', 300).subscribe(e => this.loadBlogPage());
  }
  ngOnDestroy() {
    this.infiniteScrollSubscription.unsubscribe();
  }


  initBlogPageLoad() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idxView = params.get('idx');
      this.category = params.get('blog_category');
      if (this.a.postInMemory && this.a.postInMemory.idx === this.idxView) {
        console.log('Got post from memory');
        this.postView = this.a.postInMemory;
      }
      this.loadBlogPage();
    });
  }
  loadBlogPage() {
    if (this.loading || this.noMorePosts) {
      console.log('in loading. or no more post just return');
      return;
    } else {
      console.log('Going to list post page');
    }
    this.loading = true;
    const req: ApiPostSearch = {
      post_id: 'blog',
      page_no: this.page_no,
      limit: this.limit
    };
    if (this.a.inBlogSite) {
      console.log('a.blog: ', this.a.blog);
      req.uid = this.a.blog.idx;
    }
    if ( this.category ) {
      req.category = this.category;
    }
    if (this.idxView) {
      req.view = this.idxView;
      this.idxView = 0;
    }

    console.log('req: ', req);
    this.a.philgo.postSearch(req).subscribe(search => {
      this.loading = false;
      console.log('BlogListComponent::loadPage() => search: ', search);
      this.forumLoaded = true;
      this.page_no++;
      this.forum = search;
      /**
       * Show post in view
       */
      if (search && search.view && search.view.idx) {
        this.postView = search.view;
        this.postView.show = true;
      }
      if (!search.posts || !search.posts.length) {
        this.noMorePosts = true;
        return;
      }

      /**
       * Don't show the post of view (on top) in the post-list.
       */
      if (this.postView && this.postView.idx) {
        const pos = search.posts.findIndex(v => v.idx === this.postView.idx);
        if (pos !== -1) {
          //
          search.posts.splice(pos, 1, <any>{});
        }
      }

      this.posts = this.posts.concat(search.posts);

      if (search.posts.length < this.limit) {
        this.noMorePosts = true;
        return;
      }
    }, e => {
      this.forumLoaded = true;
      this.loading = false;
      this.a.error(e);
    });
  }
}
