import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../../services/services/users.service";
import {User} from "../../../../services/models/user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{
  connectedUsers: User[] = [];

  constructor(
    private userService: UsersService
  ) {
  }

  ngOnInit(): void {
    this.loadConnectedUsers();
  }

  private loadConnectedUsers() {
    this.userService.findConnectedUsers().subscribe(users => this.connectedUsers = users);
  }

}
