import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
    /**
     * Creates an instance of HttpService.
     * @param {HttpClient} http
     * @memberof HttpService
     */
    constructor(private readonly http: HttpClient) {}

    /**
     * Ajusta o path da url pela variavel do enviroments
     *
     * @param {string} path
     * @return {*}
     * @memberof HttpService
     */
    url(path: string): any {
        return environment.apiUrl + path;
    }

    /**
     * Adiciona o header do REQUEST
     *
     * @return {*}
     * @memberof HttpService
     */
    defaultOptions(): {} {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        return httpOptions;
    }

    /**
     * Post usando Observable.
     * RXJS ira depreciar nas versoes futuras
     *
     * @param {*} url
     * @param {*} params
     * @return {*}  {Observable<any>}
     * @memberof HttpService
     */
    postSync(url: any, params: any): Observable<any> {
        return this.http.post(this.url(url), params, this.defaultOptions());
    }

    /**
     * get usando Observable
     * RXJS ira depreciar nas versoes futuras
     *
     * @param {*} url
     * @return {*}  {Observable<any>}
     * @memberof HttpService
     */
    getSync(url: any): Observable<any> {
        return this.http.get(this.url(url), this.defaultOptions());
    }

    /**
     * PUT usando Observable
     * RXJS ira depreciar nas versoes futuras
     *
     * @param {*} url
     * @param {*} obj
     * @return {*}  {Observable<any>}
     * @memberof HttpService
     */
    putSync(url: any, obj: any): Observable<any> {
        return this.http.put(this.url(url), obj, this.defaultOptions());
    }

    /**
     * Delete usando Observable
     * RXJS ira depreciar nas versoes futuras
     *
     * @param {*} url
     * @return {*}  {Observable<any>}
     * @memberof HttpService
     */
    deleteSync(url: any): Observable<any> {
        return this.http.delete(this.url(url), this.defaultOptions());
    }

    /**
     * Post Async Promise
     *
     * @param {*} url
     * @param {*} params
     * @param {*} options
     * @return {*}  {Promise<Object>}
     * @memberof HttpService
     */
    async post(url: any, params: any, options: any = this.defaultOptions()): Promise<Object> {
        let res = await firstValueFrom(this.http.post(this.url(url), params, options));
        return res;
    }

    /**
     * GET Async Promise
     *
     * @param {*} url
     * @return {*}  {Promise<any>}
     * @memberof HttpService
     */
    async get(url: any, options = this.defaultOptions()): Promise<any> {
        let res = await firstValueFrom(this.http.get(this.url(url), options));
        return res;
    }

    /**
     * PUT Async Promise
     *
     * @param {*} url
     * @param {*} obj
     * @return {*}  {Promise<any>}
     * @memberof HttpService
     */
    async put(url: any, obj: any, options = this.defaultOptions()): Promise<any> {
        let res = await firstValueFrom(this.http.put(this.url(url), obj, options));
        return res;
    }

    /**
     * DELETE Async Promise
     *
     * @param {*} url
     * @return {*}  {Promise<any>}
     * @memberof HttpService
     */
    async delete(url: any, options = this.defaultOptions()): Promise<any> {
        let res = await firstValueFrom(this.http.delete(this.url(url), options));
        return res;
    }
}
