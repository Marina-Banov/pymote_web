import { Component, OnInit } from "@angular/core";

import { D3Network } from "../../models/d3-models";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public network?: D3Network;

  constructor() {}

  ngOnInit(): void {}

  public updateNetwork(network: D3Network): void {
    this.network = network;
  }
}
