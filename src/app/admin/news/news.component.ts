import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {NewsVO} from '../../domain/news.vo';
import {PageVO} from '../../domain/page.vo';
import {Router} from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newList: NewsVO[];
  page: PageVO;

  constructor(private adminService: AdminService, private router: Router) {
    this.page = new PageVO(0, 5, 0);
  }

  ngOnInit() {
    this.getNewsList();
  }

  getNewsList() {
    const params = {
      start_index: this.page.pageIndex * this.page.pageSize,
      page_size: this.page.pageSize
    };
    this.adminService.findNews(params)
      .subscribe(res => {
        console.log(res);
        if (res.result === 0) {
          this.newList = res.data;
          this.page.totalCount = res.total;
        }
      });
  }

  pageChanged(event: any) {
    console.log(event);
    this.page.pageIndex = event.pageIndex;
    this.page.pageSize = event.pageSize;
    this.getNewsList();
  }

  gotoView(news: NewsVO) {
    this.router.navigateByUrl(`/admin/news/view/${news.news_id}`);
  }

  gotoWrite() {
    this.router.navigateByUrl('/admin/news/write');
  }
}
