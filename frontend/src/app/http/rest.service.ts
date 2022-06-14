import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpClientService } from "./http-client";
import { PymoteNetwork } from "../models/pymote-models";

@Injectable({ providedIn: "root" })
export class RestService {
  constructor(protected httpClientService: HttpClientService) {}

  public uploadNetwork(data: FormData): Observable<PymoteNetwork> {
    this.httpClientService.buildURL("/api/upload_network");
    return this.httpClientService.post<PymoteNetwork>(data);
  }

  public playSimulation(): Observable<PymoteNetwork> {
    this.httpClientService.buildURL("/api/run_simulation");
    return this.httpClientService.post<PymoteNetwork>();
  }
}
