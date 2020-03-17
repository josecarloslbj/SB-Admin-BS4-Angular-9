import { NgModule } from '@angular/core';
import { HttpConfigInterceptor } from './http-config-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
  ]
})
export class HttpConfigModule {}
