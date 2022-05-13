import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpClientService } from "./http-client";
import { Network } from "../models/network";

@Injectable({ providedIn: "root" })
export class RestService {
  constructor(protected httpClientService: HttpClientService) {}

  public uploadNetwork(data: FormData): Observable<Network> {
    this.httpClientService.buildURL("/api/upload_network");
    return this.httpClientService.post<Network>(data);
  }
}
