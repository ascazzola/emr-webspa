import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppContainerComponent } from './app-container/app-container.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AppContainerComponent,
    canActivate: [AuthGuard],
    title: 'EMR',
    
    children: [
      {
        path: '',
        component: DashboardComponent,
        title: 'EMR - Home'
      },
     
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'EMR - Login'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
