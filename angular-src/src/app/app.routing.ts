import { Component,ModuleWithProviders } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';


const appRoutes:Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);