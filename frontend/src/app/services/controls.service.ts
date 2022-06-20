import { Injectable } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";

import { Controls } from "../models/controls";

@Injectable({
  providedIn: "root",
})
export class ControlsService {
  public controls = new Controls();

  constructor() {}

  public update(e: MatCheckboxChange): void {
    // @ts-ignore
    this.controls[e.source.id] = e.checked;
  }
}
