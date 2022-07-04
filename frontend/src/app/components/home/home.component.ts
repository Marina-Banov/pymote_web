import { Component, OnInit } from "@angular/core";

import { PymoteNetwork, PymoteNode } from "../../models/pymote-models";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public network?: PymoteNetwork;
  public selectedNode?: PymoteNode;
  public simulationButtons: any[];

  constructor() {
    this.simulationButtons = [
      { action: "run", icon: "play_arrow" },
      { action: "step", icon: "fast_forward" },
      { action: "reset", icon: "fast_rewind" },
    ];
  }

  ngOnInit(): void {}

  public updateNetwork(network: PymoteNetwork): void {
    this.network = network;
    this.selectedNode = undefined;
  }

  public selectNode(node: PymoteNode): void {
    this.selectedNode = node;
  }
}
