import { HttpEvent } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/shared/data-access/services/users.service';
import { User } from 'src/app/shared/data-access/types/User';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @Input({required: true}) users: User[] = [];
  @Input() test!: Observable<HttpEvent<User[]>>;
  @Output() editUserEvent = new EventEmitter<User>();
  @Output() deleteUserEvent = new EventEmitter<User>();

  page: number = 1;
  tableSize: number = 10;
  tableSizes: number[] = [5, 10, 15, 20]; 

  allUsers: User[] = [];


  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.allUsers = this.users;
  }

  // getUsers(response: HttpEvent<User[]>): void {
  //   this.test.pipe(filter((event: HttpEvent<User[]>) => event.type === HttpEventType.Response), tap((event: HttpEvent<User[]>) => {
  //     this.users = event.body as User[];
  //   }));
  // }

  showEditUserModal(addUserModal: HTMLDialogElement) {
    addUserModal.showModal();
  }

  showDeleteUserModal(deleteUserModal: HTMLDialogElement) {
    deleteUserModal.showModal();
  }


  editUser(user: User) {
    // const editedUser = this.usersService.editUser(user);
    this.editUserEvent.emit(user);
  }

  deleteUser(user: User) {
    const isDeleteUser = window.confirm(`Are you sure you want to delete ${user.name.firstname}?`);
    if (isDeleteUser) {
      this.deleteUserEvent.emit(user);
    }
  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.allUsers = this.users;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.allUsers = this.users;
  }

}
