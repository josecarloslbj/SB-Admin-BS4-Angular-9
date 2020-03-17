import { HttpClient } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { AuthOperationService } from '../auth/auth-operation.service';
import { Pagination } from '../interface/Pagination';
import { Order } from '../interface/Order';

export abstract class BaseAbstractService<T, S> {
    protected _http: HttpClient;
    protected _authOperationService: AuthOperationService;
    private _searchCodeReference: string;
    private _detailCodeReference: string;
    protected _saveCodeReference: string;
    private _deleteCodeReference: string;

    constructor(
        http: HttpClient,
        authOperationService: AuthOperationService,
        searchCodeReference: string,
        detailCodeReference: string,
        saveCodeReference: string,
        deleteCodeReference: string
    ) {
        this._http = http;
        this._authOperationService = authOperationService;
        this._searchCodeReference = searchCodeReference;
        this._detailCodeReference = detailCodeReference;
        this._saveCodeReference = saveCodeReference;
        this._deleteCodeReference = deleteCodeReference;
    }

    search(obj: T, pagination?: Pagination, order?: Order): Observable<any> {
        const operationURL = this._authOperationService.getUrlByCodeReferece(this._searchCodeReference);
        return this._http.post(operationURL, Object.assign({}, obj, { pageInfo: Object.assign({}, pagination, order) }));
    }

    detail(id: number): Observable<any> {
        const operationURL = this._authOperationService.getUrlByCodeReferece(this._detailCodeReference);
        if (!operationURL) {
            return empty();
        }
        return this._http.get(`${operationURL}/${id}`);
    }

    save(obj: S): Observable<any> {
        const operationURL = this._authOperationService.getUrlByCodeReferece(this._saveCodeReference);
        return this._http.post(operationURL, obj);
    }

    delete(id: number): Observable<any> {
        const operationURL = this._authOperationService.getUrlByCodeReferece(this._deleteCodeReference);
        return this._http.delete(`${operationURL}/${id}`);
    }
}
