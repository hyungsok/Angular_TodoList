import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {TodoVO} from './domain/Todo.vo';

@Injectable()
export class UserService {
  private SERVER: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.SERVER = `${environment.HOST}`;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  addTodo(params: TodoVO) {
    return this.http.post(this.SERVER + '/api/todo', JSON.stringify(params), {headers: this.headers}).toPromise();
  }

  getTodoList() {
    return this.http.get(this.SERVER + '/api/todo').toPromise();
  }
}

