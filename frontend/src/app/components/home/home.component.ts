import { Component, OnInit } from "@angular/core";

import { PymoteNetwork } from "../../models/pymote-models";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public network?: PymoteNetwork;

  constructor() {}

  ngOnInit(): void {}

  public updateNetwork(network: PymoteNetwork): void {
    this.network = network;
  }
}
