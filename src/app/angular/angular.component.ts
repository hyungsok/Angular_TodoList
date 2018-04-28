import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {TodoVO} from '../domain/todo.vo';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-augular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translate(0, 0)'})),
      transition('void => in', [
        style({opacity: 0, transform: 'translate(-100%, 0)'}),
        animate(1000)]),
      transition('in => void', [
        animate(1000, keyframes([
          style({opacity: 1, transform: 'translate(0, 0)'}),
          style({opacity: 1, transform: 'translate(-100px, 0)'}),
          style({opacity: 0, transform: 'translate(100%, 0)'})
        ]))
      ])
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
    console.log('restore click');
    const tempTodo = this.tempTodoList.get(todo.todo_id);
    Object.assign(todo, tempTodo);

    todo.isEdited = false;
  }

  modify(todo: TodoVO) {
    console.log('modify click');
    this.userService.modifyTodo(todo)
      .subscribe(body => {
        console.log('body : ' + body);
        Object.assign(todo, body);
        todo.isEdited = false;
      });
  }

  remove(todo: TodoVO, index: number) {
    console.log('remove click : ' + index);
    const result = confirm(index + ' : ' + todo.todo + ' 을(를) 삭제하시겠습니까?');
    if (result) {
      this.userService.removeTodo(todo.todo_id)
        .subscribe(resultVO => {
          console.log('response : ' + resultVO);
          if (resultVO.result === 0) {
            this.todoList.splice(index, 1);
          }
        });
    }
  }

}
