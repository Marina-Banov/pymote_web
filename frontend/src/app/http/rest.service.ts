import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpClientService } from "./http-client";

@Injectable({ providedIn: "root" })
export class RestService {
  constructor(protected httpClientService: HttpClientService) {}

  public uploadNetwork(data: any): Observable<any> {
    this.httpClientService.buildURL("/api/upload_network");
    return this.httpClientService.post(data);
  }
}
