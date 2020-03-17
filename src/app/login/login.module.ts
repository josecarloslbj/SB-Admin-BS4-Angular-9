import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AuthModule } from '../shared/auth/auth.module';
import { AuthService } from '../shared/auth/auth.service';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoginRoutingModule,
        AuthModule],
    declarations: [LoginComponent]
   
})
export class LoginModule { }
