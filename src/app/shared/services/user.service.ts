
import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseAbstractService } from './BaseAbstractService';
import { AuthOperationService } from '../auth/auth-operation.service';

@Injectable({
    providedIn: 'root'
})

export class UserService extends BaseAbstractService<Object, Object> {

    constructor(private http: HttpClient,
        private authOperationService: AuthOperationService) {

        super(http,
            authOperationService,
            'OPE_GERAR_RELATORIO.cod_referencia',
            '',
            '',
            '');
    }

    login(formData: any) {

        console.log(formData);
        //    return this.http.post(BaseURI + '/ApplicationUser/Login', formData);
    }
}
