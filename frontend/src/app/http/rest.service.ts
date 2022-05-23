import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpClientService } from "./http-client";
import { D3Network } from "../models/d3-models";

@Injectable({ providedIn: "root" })
export class RestService {
  constructor(protected httpClientService: HttpClientService) {}

  public uploadNetwork(data: FormData): Observable<D3Network> {
    this.httpClientService.buildURL("/api/upload_network");
    return this.httpClientService.post<D3Network>(data);
  }
}
