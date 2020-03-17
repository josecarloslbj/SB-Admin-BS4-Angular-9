import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';
import { AuthGuardSystem } from './auth-guard-system';
import { AuthRequestInterceptor } from './auth-request-interceptor';
import { AuthOperationDirective } from './auth-operation.directive';
import { AuthOperationService } from './auth-operation.service';

@NgModule({
  declarations: [
    AuthOperationDirective
  ],
  imports: [
  ],
  exports: [
    AuthOperationDirective
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuard,
        AuthGuardSystem,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthRequestInterceptor,
          multi: true
        },
        AuthOperationService
      ]
    };
  }
}
