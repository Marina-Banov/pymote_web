import { Component, OnInit } from "@angular/core";

import { ControlsService } from "../../services/controls.service";

@Component({
  selector: "app-controls",
  templateUrl: "./controls.component.html",
  styleUrls: ["./controls.component.scss"],
})
export class ControlsComponent implements OnInit {
  constructor(public controlsService: ControlsService) {}

  ngOnInit(): void {}
}
