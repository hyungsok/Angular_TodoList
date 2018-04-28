import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {TodoVO} from '../domain/todo.vo';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-augular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translate(0, 0)'})),
      transition('void => in', [
        style({opacity: 0, transform: 'translate(-100%, 0)'}),
        animate(1000)])
    ])
  ]
})

export class AngularComponent implements OnInit {
  todoList: TodoVO[] = [];
  newTodo = new TodoVO();
  tempTodoList = new Map<number, TodoVO>();

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

  addTodo() {
    console.log('addTodo click');
    this.userService.addTodo(this.newTodo)
      .subscribe(body => {
        console.log('body : ' + body);
        // todoList 맨앞에 삽입
        this.todoList.unshift(body);
      });
    this.newTodo = new TodoVO();
  }

  save(todo: TodoVO) {
    todo.isEdited = true;

    // deep copy를 하는 방법 : es6의 spread 연산자
    const tempTodo = Object.assign({}, todo);
    this.tempTodoList.set(tempTodo.todo_id, tempTodo);
  }

  restore(todo: TodoVO) {
    const tempTodo = this.tempTodoList.get(todo.todo_id);
    Object.assign(todo, tempTodo);

    todo.isEdited = false;
  }
}
