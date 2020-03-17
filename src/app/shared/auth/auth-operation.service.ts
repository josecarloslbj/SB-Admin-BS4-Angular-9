import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthOperationService {
    userOperations: any;
    accessDeniedRoute = '';

    constructor(
        private authService: AuthService,
        private configService: ConfigService,
        private router: Router) {
        this.authService.userOperations.subscribe((permissions) => {
            this.userOperations = permissions;
        });
        this.accessDeniedRoute = configService.obterConfiguracao(configService.ACCESS_DENIED_ROUTE_CONFIG);
    }

    getUrlByCodeReferece(codeReferece: string): string {

        console.log('getUrlByCodeReferece');
        return environment.URL;

        // if (this.userOperations.hasOwnProperty(codeReferece)) {
        //   const item = this.userOperations[codeReferece];
        //   if (item.urlCompleta) {
        //     let url: string = item.urlCompleta;
        //     if (url.indexOf('http') < 0) {
        //       url = `${this.configService.obterConfiguracao(this.configService.BASE_API_URL_CONFIG)}${url}`;
        //     }
        //     return url;
        //   } else {
        //     const message = 'Operação sem URL: ' + codeReferece;
        //     this.router.navigate([this.accessDeniedRoute], { queryParams: { message }});
        //     throw Error(message);
        //   }
        // } else {
        //   const message = 'Operação não encontrada: ' + codeReferece;
        //   this.router.navigate([this.accessDeniedRoute], { queryParams: { message }});
        //   throw Error(message);
        // }
    }
}
