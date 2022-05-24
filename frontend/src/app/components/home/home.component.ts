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

  constructor() {}

  ngOnInit(): void {}

  public updateNetwork(network: PymoteNetwork): void {
    this.network = network;
  }

  public selectNode(node: PymoteNode): void {
    this.selectedNode = node;
  }
}
