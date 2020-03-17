import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConfigService } from '../config/config.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthRequestInterceptor implements HttpInterceptor {
    authPrefix = '';

    constructor(private authService: AuthService, configService: ConfigService) {
        this.authPrefix = configService.obterConfiguracao(configService.AUTH_PREFIX_CONFIG);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
            .pipe(
                map(event => {

                    // this.authService.gravarToken(newToken);


                    return event;
                })
            );
    }



    //     const token = this.authService.obterToken();
    //     if (token) {
    //       req = req.clone({
    //         setHeaders: {
    //           Authorization: `${this.authPrefix} ${token}`
    //         }
    //       });
    //     }

    //     return next.handle(req)
    //       .pipe(
    //         map(event => {
    //           if (event instanceof HttpResponse) {
    //             const newToken = event.headers.get('AUTHORIZATION_RESPONSE_TOKEN');
    //             if (newToken && newToken !== '') {
    //               this.authService.gravarToken(newToken);
    //             }
    //           }
    //           return event;
    //         })
    //       );
    //   }
}
