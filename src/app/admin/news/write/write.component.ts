import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../admin.service';
import {NewsVO} from '../../../domain/news.vo';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
})
export class WriteComponent implements OnInit {
  news = new NewsVO();
  fileList: FileList;

  constructor(private adminService: AdminService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
  }

  addNews() {
    this.adminService.addNews(this.news)
      .subscribe(res => {
        console.log(res);
        this.snackBar.open('등록하였습니다.', null, {duration: 3000});
        this.router.navigateByUrl('admin/news');

        // 뉴스 등록 이벤트 발생
        this.adminService.refresh.next(true);
      });
  }

  fileChange(event: any) {
    console.log(event);
    this.fileList = event.target.files;
    console.log(this.fileList);

    // show thumbnail
    let reader = new FileReader();
    reader.readAsDataURL((this.fileList[0]));
    reader.onload = () => {
      // this.thumbnailSrc = reader.result;
      this.imageUpload();
    };

  }

  imageUpload() {
    const formData = new FormData();
    if (this.fileList && this.fileList.length > 0) {
      const file = this.fileList[0];
      formData.append('a', 'b'); // Test
      formData.append('file', file, file.name);
    }
    this.adminService.imageUpload(formData)
      .subscribe(res => {
        console.log(res);
        if (res['result'] === 0) {
          // 이미지 경로를 editor에 추가한다. console.log(res['value']);
          if (this.news.content) {
            this.news.content += `<img src="http://www.javabrain.kr${res['value']}" style="max-width: 100%;">`;
          } else {
            this.news.content = `<img src="http://www.javabrain.kr${res['value']}" style="max-width: 100%;">`;
          }
        }
      });
  }
}
