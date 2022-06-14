import { Component, EventEmitter, OnInit, Output } from "@angular/core";

import { RestService } from "../../http/rest.service";
import { PymoteNetwork } from "../../models/pymote-models";

@Component({
  selector: "app-play-button",
  templateUrl: "./play-button.component.html",
  styleUrls: ["./play-button.component.scss"],
})
export class PlayButtonComponent implements OnInit {
  @Output() updateNetwork: EventEmitter<PymoteNetwork>;
  public loading = false;

  constructor(protected restService: RestService) {
    this.updateNetwork = new EventEmitter();
  }

  ngOnInit(): void {}

  onPlay(): void {
    this.loading = true;
    this.restService.simulationAction({ action: "run" }).subscribe({
      next: (res) => this.updateNetwork.emit(res),
      complete: () => (this.loading = false),
    });
  }
}
