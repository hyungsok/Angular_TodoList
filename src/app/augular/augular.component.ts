import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-augular',
  templateUrl: './augular.component.html',
  styleUrls: ['./augular.component.scss']
})
export class AugularComponent implements OnInit {
  todoList: TodoVO[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    console.log('AugularComponent ngOnInit');
    this.userService.getTodoList()
      .then(data => {
        console.log('getTodoList data : ' + data);
        this.todoList = data;
      });
  }

}
