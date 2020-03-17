import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthGuard implements CanActivate {

  loginRoute = '';
  accessDeniedRoute = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private configService: ConfigService) {
    this.loginRoute = configService.obterConfiguracao(configService.LOGIN_ROUTE_CONFIG);
    this.accessDeniedRoute = configService.obterConfiguracao(configService.ACCESS_DENIED_ROUTE_CONFIG);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!route.data.codeReference) {
      throw new Error('ERRO! Todas as rotas devem possuir um código de referencia; ' + route);
    }

    if (this.authService.tokenExpirado()) {
      this.router.navigate([this.loginRoute]);
      return false;
    }

    return this.authService.podeAcessarFuncionalidade(route.data.codeReference)
      .pipe(map((res) => {
        this.authService.obterOperacoesDoUsuario(route);
        return true;
      }));
  }
}
