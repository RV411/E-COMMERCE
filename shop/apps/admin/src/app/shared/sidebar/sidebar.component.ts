import { Component } from '@angular/core';
import { AuthService } from '@bluebits/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent{
  constructor(private authService:AuthService) {}

  logoutuser(){
    this.authService.logout();
  }
}
