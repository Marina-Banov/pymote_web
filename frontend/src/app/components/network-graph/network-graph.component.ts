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
  public colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#00FFFF",
    "#FF00FF",
    "#FFFF00",
    "#FFFFFF",
    "#000000",
  ];
  @Input() network?: PymoteNetwork;
  @Output() selectNode: EventEmitter<PymoteNode>;

  constructor() {
    this.selectNode = new EventEmitter();
  }

  ngOnInit(): void {}

  public getCoordinate(index: any, c: string) {
    if (typeof index == "number" && this.network) {
      return c == "x"
        ? this.network.nodes[index]?.info?.position[0]
        : this.height - (this.network.nodes[index]?.info?.position[1] || 0);
    }
    return 0;
  }

  public onNodeClick(node: PymoteNode) {
    this.selectNode.emit(node);
  }
}
