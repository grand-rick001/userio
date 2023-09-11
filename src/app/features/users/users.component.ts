import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/core/core-services/spinner.service';
import { UsersService } from 'src/app/shared/data-access/services/users.service';
import { User } from 'src/app/shared/data-access/types/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  /**
   * TODO: Remove all comments from this file.
   * 
   */
  users: User[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private usersService: UsersService, private renderer: Renderer2, private spinner: SpinnerService) {}

  // displayOptions(): void {
  //   this.renderer.addClass(dropdownContent, 'block');
  // }

  ngOnInit(): void {
    this.spinner.show();
    this.subscription = this.usersService.getUsers().subscribe((event: HttpEvent<User[]>) => {
      switch (event.type) {
        // case HttpEventType.Sent:
        //   console.log('Request sent!');
        //   break;
        // case HttpEventType.ResponseHeader:
        //   console.log('Response received!');
        //   break;
        // case HttpEventType.DownloadProgress:
        //   console.log('Downloaded!');
        //   break;
        case HttpEventType.Response:
          this.users = event.body as User[];
          this.spinner.hide();
          break;
      }
    });
    // const dropdown = document.querySelector('.dropdown');

    // dropdown?.addEventListener('click', () => {
    //   const dropdownContent = document.querySelector('.dropdown-content');
    //   dropdownContent?.classList.toggle('block');
    //   dropdownContent?.classList.toggle('hidden');
    // });
    
  }
  
  editUser(user: User): void {}

  deleteUser(user: User): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
