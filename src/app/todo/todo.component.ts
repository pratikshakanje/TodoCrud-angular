import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ItodosArr } from 'src/app/model/todoInterface';
import { UuidServiceService } from 'src/app/service/uuid.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoCrudComponent implements OnInit {
  @ViewChild('todoName') todoNameRef !: ElementRef
  @ViewChild('isCompleted') isCompletedRef ! : ElementRef

  isInEditMode: boolean = false;

  updateId!: string 
  todosArr: ItodosArr[] = [
    {
      todoName: 'Angular',
      todoId: '11',
      isCompleted: true,
    },
    {
      todoName: 'Javascript',
      todoId: '12',
      isCompleted: false,
    },
    {
      todoName: 'Node',
      todoId: '13',
      isCompleted: true,
    },
    {
      todoName: 'Typescript',
      todoId: '14',
      isCompleted: true,
    },
    {
      todoName: 'Express.js',
      todoId: '15',
      isCompleted: false,
    }
  ]


  constructor(private _uuidServiceService: UuidServiceService
  ) {

  }

  ngOnInit(): void {
  }

  onAddTodo() {
    let todo: ItodosArr = {
      todoName: this.todoNameRef.nativeElement.value,
      todoId: this._uuidServiceService.getuuid(),
      isCompleted: this.isCompletedRef.nativeElement.value === 'yes'
    }

    this.todosArr.push(todo)
    console.log(todo)
    this.onReset();

    this._uuidServiceService.snackbar('New todo created successfully!!')
  }


  // EDIT
  onEditTodo(todo: ItodosArr) {
    this.todoNameRef.nativeElement.value = todo.todoName
    this.isCompletedRef.nativeElement.value = todo.isCompleted ? 'yes' : 'no'

    this.isInEditMode = true;

    this.updateId = todo.todoId;

  }

  // UPDATE
  onUpdateTodo() {

    let updateObj : ItodosArr = {
      todoName: this.todoNameRef.nativeElement.value,
      todoId: this.updateId,
      isCompleted: this.isCompletedRef.nativeElement.value === 'yes' 
    }
    const index1 = this.todosArr.findIndex(ele => ele.todoId === this.updateId);

    this.todosArr[index1] = updateObj

    this._uuidServiceService.snackbar('Todo updated successfully!!')


    this.onReset();

  }

  // DELETE
  onDeleteTodo(id: string) {

    let idx = this.todosArr.findIndex(ele => ele.todoId === id);

    this.todosArr.splice(idx, 1)

    this._uuidServiceService.snackbar('Todo deleted successfully!!')


  }

  // RESET
  onReset() {

    this.todoNameRef.nativeElement.value = ''
    this.isCompletedRef.nativeElement.value = ''


    this.isInEditMode = false;
  }


  onUpdateCheckbox(todo : ItodosArr){
    todo.isCompleted = !todo.isCompleted;

    this._uuidServiceService.snackbar('checkbox updated successfully')

  }
}