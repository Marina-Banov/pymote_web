import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { PymoteNetwork } from "../../models/pymote-models";
import { RestService } from "../../http/rest.service";
import { ControlsService } from "../../services/controls.service";

@Component({
  selector: "app-simulation-button",
  templateUrl: "./simulation-button.component.html",
  styleUrls: ["./simulation-button.component.scss"],
})
export class SimulationButtonComponent implements OnInit {
  @Input() action = "";
  @Input() icon = "";
  @Output() updateNetwork: EventEmitter<PymoteNetwork>;
  public loading = false;

  constructor(
    protected restService: RestService,
    protected controlsService: ControlsService
  ) {
    this.updateNetwork = new EventEmitter();
  }

  ngOnInit(): void {}

  onAction(): void {
    this.loading = true;
    const data: any = {
      action: this.action,
      treeKey: this.controlsService.controls.treeKey,
    };
    if (this.action == "step") {
      data.stepSize = Math.max(this.controlsService.controls.steps, 1);
    }
    this.restService
      .simulationAction(data)
      .subscribe({
        next: (res) => this.updateNetwork.emit(res),
        error: () => {},
      })
      .add(() => (this.loading = false));
  }
}
