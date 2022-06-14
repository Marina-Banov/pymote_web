import { Component, EventEmitter, OnInit, Output } from "@angular/core";

import { RestService } from "../../http/rest.service";
import { PymoteNetwork } from "../../models/pymote-models";

@Component({
  selector: "app-reset-button",
  templateUrl: "./reset-button.component.html",
  styleUrls: ["./reset-button.component.scss"],
})
export class ResetButtonComponent implements OnInit {
  @Output() updateNetwork: EventEmitter<PymoteNetwork>;
  public loading = false;

  constructor(protected restService: RestService) {
    this.updateNetwork = new EventEmitter();
  }

  ngOnInit(): void {}

  onReset(): void {
    this.loading = true;
    this.restService.simulationAction({ action: "reset" }).subscribe({
      next: (res) => this.updateNetwork.emit(res),
      complete: () => (this.loading = false),
    });
  }
}
