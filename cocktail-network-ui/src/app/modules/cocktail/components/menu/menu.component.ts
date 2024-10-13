import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../../services/services/users.service";
import {ChatService} from "../../../../services/chat/chat.service";
import {AuthenticationService} from "../../../../services/services/authentication.service";
import {TokenService} from "../../../../services/token/token.service";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  username:string = '';
  userList = false;

  constructor(
    private userService: UsersService,
    private chatService: ChatService,
    private tokenService: TokenService
  ) {
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  ngOnInit(): void {
    this.userService.getCurrentUserFullName({
    }).subscribe({
      next: (response) => {
        response = JSON.stringify(response);
        console.log(response);
        this.username = response.slice(13, -2);
      },
      error: (err) => {
        console.error('Error fetching user full name:', err);
      }
    });
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if(window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      })
    });
  }


  showUserList() {
    this.userList = !this.userList;
  }

  connectToChat() {

  }
}
