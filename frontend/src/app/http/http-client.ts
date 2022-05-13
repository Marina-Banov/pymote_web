import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class HttpClientService {
  protected _url = "";
  private _headers = new HttpHeaders();
  private _queryParams = new HttpParams();

  constructor(protected _http: HttpClient) {
    this._headers = this.buildHeaders();
  }

  buildURL(url: string): HttpClientService {
    this._url = url;
    return this;
  }

  /**
   * Add URL path - base_url/path
   * @param path
   * @returns {HttpClientService}
   */
  protected addURLPath(path: string): HttpClientService {
    if (path) {
      if (this._url) {
        this._url = `${this._url}/`;
      }
      this._url = `${this._url}${path}`;
    }
    return this;
  }

  /**
   * Add URL path param - base_url/name/value
   * @param name
   * @param value
   * @returns {HttpClientService}
   */
  protected addURLPathParam(name: string, value: any): HttpClientService {
    if (name && value) {
      if (this._url) {
        this._url = `${this._url}/`;
      }
      this._url = `${this._url}${name}/${String(value)}`;
    }
    return this;
  }

  /**
   * Return basic header for JSON request
   * @returns {HttpHeaders}
   */
  protected buildHeaders(): HttpHeaders {
    // let headers = new HttpHeaders();
    // headers = headers.append('Tenant-ID', '1');
    return new HttpHeaders();
  }

  /**
   * Add header
   * @param name
   * @param value
   * @returns {HttpClient}
   */
  public addHeader(name: string, value: any): HttpClientService {
    if (value) {
      this._headers = this._headers.set(name, String(value));
    }
    return this;
  }

  /**
   * Remove header
   * @param param
   * @returns void
   */
  public removeHeader(param: string) {
    if (param) {
      this._headers.delete(String(param));
    }
  }

  /**
   * Add query param
   * @param name
   * @param value
   * @returns {HttpClient}
   */
  public addQueryParam(name: string, value: any): HttpClientService {
    if (name && value) {
      this._queryParams.append(name, String(value));
    }
    return this;
  }

  public get<T>(id?: any): Observable<T> {
    if (id) {
      this.addURLPath(id);
    }

    const httpOptions = { headers: this._headers, search: this._queryParams };
    return this._http.get<T>(this._url, httpOptions);
  }

  public post<T>(data: any): Observable<T> {
    const httpOptions = { headers: this._headers, search: this._queryParams };
    return this._http.post<T>(this._url, data, httpOptions);
  }

  public put<T>(id: any, data: any): Observable<T> {
    this.addURLPath(id || 0);
    const httpOptions = { headers: this._headers, search: this._queryParams };
    return this._http.put<T>(this._url, data, httpOptions);
  }

  public delete<T>(id: any): Observable<T> {
    this.addURLPath(id);
    const httpOptions = { headers: this._headers, search: this._queryParams };
    return this._http.delete<T>(this._url, httpOptions);
  }

  public deleteWithParam<T>(id: any): Observable<T> {
    const httpOptions = { headers: this._headers, search: this._queryParams };
    return this._http.delete<T>(this._url, httpOptions);
  }
}
