import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResultVO} from '../domain/result.vo';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {NewsVO} from '../domain/news.vo';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AdminService {
  private SERVER: string;
  private headers: HttpHeaders;

  // news 목록을 업데이트하기 위한 설정
  public refresh = new Subject<boolean>();
  public refresh$ = this.refresh.asObservable();

  constructor(private http: HttpClient) {
    this.SERVER = `${environment.HOST}`;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  findNews(params: any): Observable<ResultVO> {
    return this.http.post<ResultVO>(this.SERVER + '/api/newsList', params, {headers: this.headers});
  }

  findOneNews(news_id: number): Observable<NewsVO> {
    return this.http.get<NewsVO>(this.SERVER + `/api/news?news_id=${news_id}`);
  }

  addNews(params: NewsVO): Observable<ResultVO> {
    return this.http.post<ResultVO>(this.SERVER + '/api/news', params, {headers: this.headers});
  }

  imageUpload(formData: FormData) {
    // let headers = new HttpHeaders();
    // 브라우저가 자동 생성함.
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    // return this.http.post(this.SERVER + '/api/imageUpload', formData, {headers: headers}).toPromise();

    return this.http.post(this.SERVER + '/api/imageUpload', formData);
  }

  removeNews(news_id: number): Observable<ResultVO> {
    return this.http.delete<ResultVO>(this.SERVER + `/api/news?news_id=${news_id}`);
  }
}
