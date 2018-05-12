import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../admin.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private adminService: AdminService) {
    console.log(location.pathname);
    // view 객체를 호출할때 첫번째만 생성, 두번째부터는 안찍힌다. 한번만 생성하므로 Rx Observale패턴으로 URL 변경에 대한 데이터처리를 해줌
    this.route.params.subscribe(params => {
      const news_id = +params['news_id']; // +기호는 스트링을 숫자로 변환해줌
      console.log('news_id : ' + news_id);
      this.findOneNews(news_id);
    });
  }

  ngOnInit() {
  }

  findOneNews(news_id: number) {
    this.adminService.findOneNews(news_id)
      .subscribe(res => {
        console.log(res);
      });
  }
}
