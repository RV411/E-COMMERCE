import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from './services/auth.service';
import { LocalstorageService } from './services/localstorage.service';
import { UsersService } from './services/users.service';

const routes:Routes=[
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LoginComponent],
  providers:[
    AuthService,
    LocalstorageService,
    UsersService
  ]
})
export class UsersModule {}
