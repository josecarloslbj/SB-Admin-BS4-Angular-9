import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ConfigService } from '../config/config.service';
import { CookieStorageService } from '../storage/cookie-storage.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
    tokenName = 'PDCASE_GUARDIAN_TOKEN';

    userFeatures = new Subject<any>();

    userOperations = new BehaviorSubject<any>({});

    currentUser = new BehaviorSubject<any>({});

    constructor(
        private cookieStorage: CookieStorageService,
        private http: HttpClient,
        private configService: ConfigService,
        private router: Router) {
    }

    /**
     * Obtem o token armazenado
     * @return string com o token
     */
    obterToken(): string {
        return this.cookieStorage.get(this.tokenName);
    }

    /**
     * Armazena o token
     * @param token token a ser gravado
     */
    gravarToken(token: string): void {
        const date = this.obterDataDeExpiracaoDoToken(token);
        this.cookieStorage.set(this.tokenName, token, date);
        this.currentUser.next(this.obterUsuario());
    }

    /**
     * Obtem a data de expiração do token
     * @param token token a ser verificado
     * @return Date em que o token vai expirar
     */
    obterDataDeExpiracaoDoToken(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) { return null; }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    /**
     * Método para obter o objeto do usuário logado e as informações contidas no Token
     * @returns Object com as informações do usuário
     */
    obterUsuario(): Object {
        const token = this.cookieStorage.get(this.tokenName);

        if (!token) {
            return null;
        }

        return jwt_decode(token);
    }

    /**
     * Verifica se o token está expirado
     * @param token token a ser verificado (caso não informado o método busca o token armazenado)
     * @return boolean informando se o token é válido
     */
    tokenExpirado(token?: string): boolean {
        if (!token) { token = this.obterToken(); }
        if (!token) { return true; }

        const date = this.obterDataDeExpiracaoDoToken(token);
        if (date === undefined || date === null) { return false; }
        return !(date.valueOf() > new Date().valueOf());
    }

    // /**
    //  * Método para efetudar login do usuário
    //  * @param user objeto contendo as credências do usuário
    //  * @return Promise com o resultado da chamada de login
    //  */
    login(user: any): any {
        const baseUrl = 'http://localhost:5002/cadastrar/login';

        // const headers = new HttpHeaders().set('content-type', 'application/json');
        // const headers = new Headers();
        // headers.append('Content-Type', 'application/json');

        // const headers = new Headers({
        //     'Content-Type': 'application/json',
        //     'Accept': 'q=0.8;application/json;q=0.9'
        // });
        // const options = new RequestOptions({ headers: headers });

        // const body = JSON.stringify(user);
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');

        return this.http.post(baseUrl, JSON.stringify(user),  { headers })
            .toPromise()
            .then(res => {
                return res;
            });

        // .toPromise()
        // .then(res => {
        //     debugger;
        //     //this.gravarToken(res.body);
        //     return res;
        // });

        // return this.http
        //   .post(this.configService.obterConfiguracao(
        //     this.configService.LOGIN_URL_CONFIG),
        //     JSON.stringify(user),
        //     { observe: 'response', responseType: 'text' })
        //   .toPromise()
        //   .then(res => { this.gravarToken(res.body); this.obterFuncionalidadesDoUsuario(); return res; });
    }

    /**
     * Método para efetudar login com usuário anônimo
     * @param user objeto contendo as credências do usuário
     * @return Promise com o resultado da chamada de login
     */
    loginAnonimo(): Promise<Object> {
        return this.http
            .post(this.configService.obterConfiguracao(
                this.configService.LOGIN_ANON_URL_CONFIG),
                {},
                { observe: 'response', responseType: 'text' })
            .toPromise()
            .then(res => { this.gravarToken(res.body); this.obterFuncionalidadesDoUsuario(); return res; });
    }

    /**
     * Método para efetuar logout do usuário
     */
    logout(): void {
        this.cookieStorage.deletar(this.tokenName);
        this.currentUser.next({});
        window.location.href = this.configService.obterConfiguracao(this.configService.LOGIN_GUARDIAN);
    }

    /**
     * Método para verificar se o sistema apto para ser acessado
     * @param codeReference Código de referencia do sistema
     * @returns Observable informando true caso o sistema esteja acessível e false caso contrário
     */
    verificarStatusSistema(codeReference: string): Observable<Object> {
        const url = this.configService.obterConfiguracao(this.configService.SYSTEM_STATUS_URL_CONFIG);
        return this.http.get(`${url}/${codeReference}`);
    }

    /**
     * Método para verificar se o usuário possui acesso a determinado sistema
     * @param codeReference Código de referencia do sistema
     * @returns Observable informando true caso o usuário tenha acesso e false caso contrário
     */
    podeAcessarSistema(codeReference: string): Observable<Object> {
        const canAccessSystemUrl = this.configService.obterConfiguracao(this.configService.CAN_ACCESS_SYSTEM_URL_CONFIG);
        return this.http.get(`${canAccessSystemUrl}/${codeReference}`);
    }

    /**
     * Método para verificar se o usuário possui acesso a determinada funcionalidade
     * @param codeReference Código de referencia do funcionalidade
     * @returns Observable informando true caso o usuário tenha acesso e false caso contrário
     */
    podeAcessarFuncionalidade(codeReference: string): Observable<Object> {
        const canAccessFeatureUrl = this.configService.obterConfiguracao(this.configService.CAN_ACCESS_FEATURE_URL_CONFIG);
        return this.http.get(`${canAccessFeatureUrl}/${codeReference}`);
    }

    /**
     * Obtem as funcionalidades do usuário e adiciona ao Subject userPermissions
     */
    obterFuncionalidadesDoUsuario() {
        if (!this.tokenExpirado()) {
            const urlPermissoes = this.configService.obterConfiguracao(this.configService.FEATURES_URL_CONFIG);
            const codeReferenceSistemaAtual = this.configService.obterConfiguracao(this.configService.ACTUAL_PROJECT_REFERENCE_CONFIG);
            this.http.get(`${urlPermissoes}/${codeReferenceSistemaAtual}`).subscribe((res: any[]) => {
                const permissoes = {};

                for (const index in res) {
                    if (res.hasOwnProperty(index)) {
                        const item = res[index];
                        permissoes[item.codigoReferencia] = item;
                    }
                }

                this.userFeatures.next(permissoes);
            });
        }
    }

    /**
     * Obtem as operações do usuário e adiciona ao Subject userOperations
     */
    obterOperacoesDoUsuario(route: any) {
        const urlPermissoes = this.configService.obterConfiguracao(this.configService.ROLES_URL_CONFIG);
        this.http.get(`${urlPermissoes}/${route.data.codeReference}`).subscribe((res: any[]) => {
            const permissoes = {};

            for (const index in res) {
                if (res.hasOwnProperty(index)) {
                    const item = res[index];
                    permissoes[item.codigoReferencia] = item;
                }
            }

            this.userOperations.next(permissoes);
        });
    }

    carregarPerfilPorSistema(codeReference: string) {
        const urlLoadPerfil = this.configService.obterConfiguracao(this.configService.LOAD_PERFIL_BY_SYSTEM);
        return this.http.get(`${urlLoadPerfil}/${codeReference}`);
    }

    gravarPerfilAtual(obj: any) {
        const url = this.configService.obterConfiguracao(this.configService.SAVE_PERFIL);
        return this.http.post(url, obj);
    }
}
