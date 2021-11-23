import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';
import { SignupComponent } from './signup/signup.component';
import { InitialComponent } from './initial/initial.component';


const routes : Routes = [
  {path: 'messages', component: MessageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: '', component: InitialComponent},
  {path: '', redirectTo:'/login', pathMatch: 'full'}

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
