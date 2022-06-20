import { Injectable } from "@angular/core";

import { Controls } from "../models/controls";

@Injectable({ providedIn: "root" })
export class ControlsService {
  public controls = new Controls();

  constructor() {}
}
