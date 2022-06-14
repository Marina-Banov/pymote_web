import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { PymoteNetwork } from "../../models/pymote-models";
import { RestService } from "../../http/rest.service";

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

  constructor(protected restService: RestService) {
    this.updateNetwork = new EventEmitter();
  }

  ngOnInit(): void {}

  onAction(): void {
    this.loading = true;
    this.restService.simulationAction(this.action).subscribe({
      next: (res) => this.updateNetwork.emit(res),
      complete: () => (this.loading = false),
    });
  }
}
