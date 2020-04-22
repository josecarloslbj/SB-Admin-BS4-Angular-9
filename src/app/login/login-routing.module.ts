import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FormsModule,   
        ReactiveFormsModule
    ],   
    exports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ]
})
export class LoginRoutingModule {}
