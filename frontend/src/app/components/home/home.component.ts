import { Component, OnInit } from "@angular/core";

import { Network } from "../../models/network";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public network: Network;

  constructor() {
    this.network = new Network();
  }

  ngOnInit(): void {}

  public updateNetwork(network: Network): void {
    this.network = network;
  }
}
