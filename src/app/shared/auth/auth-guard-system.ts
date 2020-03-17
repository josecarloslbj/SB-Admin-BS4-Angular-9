import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardSystem implements CanActivate {

  loginRoute = '';
  accessDeniedRoute = '';
  urlVerificarSistema = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private configService: ConfigService) {
    // this.loginRoute = configService.obterConfiguracao(configService.LOGIN_ROUTE_CONFIG);
    // this.accessDeniedRoute = configService.obterConfiguracao(configService.ACCESS_DENIED_ROUTE_CONFIG);
    // this.urlVerificarSistema = configService.obterConfiguracao(configService.CAN_ACCESS_SYSTEM_URL_CONFIG);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    debugger;
    return true;
    // if (!route.data.codeReference) {
    //   throw new Error('ERRO! Todas as rotas devem possuir um código de referencia; ' + route);
    // }

    // if (this.authService.tokenExpirado()) {

    //   //this.router.navigate([this.loginRoute]);
    //   return false;
    // }

    // return this.authService.podeAcessarSistema(route.data.codeReference)
    //   .pipe(map(() => {
    //     return true;
    //   }));
  }
}
