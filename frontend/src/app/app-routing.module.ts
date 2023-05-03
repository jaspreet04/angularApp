import { UserComponent } from './pages/user/user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard.service';

const routes: Routes = [{ path: '', component: LoginComponent }, 
  {path:'signup', component:SignupComponent},
  {path:'dashboard', component:DashboardComponent, canActivate: [AuthGuard] },
  {path:'user', component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
