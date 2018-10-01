import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
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

  subscriptionRoute;
  //
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public a: AppService,
    public philgo: PhilGoApiService,
    private scroll: InfiniteScrollService
  ) {
    console.log('BlogListComponent::constructor()');
    /**
     * Blog ready?
     */
    philgo.blogChange.subscribe((blog: ApiBlogSettings) => {
      if (blog) {
        /**
         * Yes, blog is ready now.
         */
        console.log('=====> blogChange.subscribe()');
        this.initBlogPageLoad();


        this.subscriptionRoute = a.routeChange.subscribe(route => {
          /**
           * Yes, category changed.
           * If `this.forumLoaded` is false, it means, blog has not loaded yet.
           * So, blog is not changed but first loaded.
           */
          if (this.forumLoaded) {
            console.log('=====> category changed: ', route, this.category);
            this.initBlogPageLoad();
          } else {
            console.log('=====> category listing. category is NOT chagned but first time loaded');
          }
        });


      }
    });

  }

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.infiniteScrollSubscription = this.scroll.watch('section.blog-list', 300).subscribe(e => this.loadBlogPage());
  }
  ngOnDestroy() {
    if (this.infiniteScrollSubscription) {
      this.infiniteScrollSubscription.unsubscribe();
      this.infiniteScrollSubscription = null;
    }

    if (this.subscriptionRoute) {
      this.subscriptionRoute.unsubscribe();
      this.subscriptionRoute = null;
    }
  }


  initBlogPageLoad() {
    this.page_no = 1;
    this.posts = [];
    this.forum = null;
    this.postView = null;
    this.category = null;
    this.loading = false;
    this.noMorePosts = false;
    this.forumLoaded = false;
    this.activatedRoute.paramMap.subscribe(params => {
      this.idxView = params.get('idx');
      const cat = params.get('blog_category');
      if (cat === 'all') {
        this.category = '';
      } else {
        this.category = cat;
      }
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
      // console.log('a.blog: ', this.a.blog);
      req.uid = this.a.blog.idx;
    }
    if (this.category) {
      req.category = this.category;
    }
    if (this.idxView) {
      req.view = this.idxView;
      this.idxView = 0;
    }

    // console.log('req: ', req);
    this.a.philgo.postSearch(req).subscribe(search => {
      this.loading = false;
      // console.log('BlogListComponent::loadPage() => search: ', search);
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
