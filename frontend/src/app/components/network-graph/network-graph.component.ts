import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { PymoteNetwork, PymoteNode } from "../../models/pymote-models";

@Component({
  selector: "app-network-graph",
  templateUrl: "./network-graph.component.html",
  styleUrls: ["./network-graph.component.scss"],
})
export class NetworkGraphComponent implements OnInit {
  public margin = { top: 10, right: 10, bottom: 10, left: 10 };
  public width = 620 - this.margin.left - this.margin.right;
  public height = 620 - this.margin.top - this.margin.bottom;
  private colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#00FFFF",
    "#FF00FF",
    "#FFFF00",
    "#FFFFFF",
    "#000000",
  ];
  public colorMap: any = {};

  public _network?: PymoteNetwork;
  @Input() set network(n: PymoteNetwork | undefined) {
    if (!n) return;
    this._network = n;
    let i = -1;
    this._network.currentAlgorithm?.statusKeys.forEach((key, index) => {
      if (key == "IDLE") {
        this.colorMap[key] = this.colors[7];
      } else {
        i = index % 8 == 7 ? 0 : i + 1;
        this.colorMap[key] = this.colors[i];
      }
    });
  }
  @Output() selectNode: EventEmitter<PymoteNode>;

  constructor() {
    this.selectNode = new EventEmitter();
  }

  ngOnInit(): void {}

  public getCoordinate(index: any, c: string) {
    if (typeof index == "number" && this._network) {
      return c == "x"
        ? this._network.nodes[index]?.info?.position[0]
        : this.height - (this._network.nodes[index]?.info?.position[1] || 0);
    }
    return 0;
  }

  public onNodeClick(node: PymoteNode) {
    this.selectNode.emit(node);
  }
}
