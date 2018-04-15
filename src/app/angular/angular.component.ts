import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {TodoVO} from '../domain/todo.vo';


@Component({
  selector: 'app-augular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss']
})

export class AngularComponent implements OnInit {
  todoList: TodoVO[] = [];
  newTodo = new TodoVO();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.userService.getTodoList()
      .subscribe(body => {
        this.todoList = body;
        console.log(this.todoList);
      });
  }

  add_todo() {
    console.log('add_todo click');
    this.userService.addTodo(this.newTodo)
      .subscribe(body => {
        console.log('body : ' + body);
        // todoList 맨앞에 삽입
        this.todoList.unshift(body);
      });
    this.newTodo = new TodoVO();
  }

}
