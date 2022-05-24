import { Component, Input, OnInit } from "@angular/core";
import { D3Network } from "../../models/d3-models";

@Component({
  selector: "app-network-graph",
  templateUrl: "./network-graph.component.html",
  styleUrls: ["./network-graph.component.scss"],
})
export class NetworkGraphComponent implements OnInit {
  public margin = { top: 10, right: 10, bottom: 10, left: 10 };
  public width = 620 - this.margin.left - this.margin.right;
  public height = 620 - this.margin.top - this.margin.bottom;
  @Input() network?: D3Network;

  constructor() {}

  ngOnInit(): void {}

  public getCoordinate(index: any, c: string) {
    if (typeof index == "number" && this.network) {
      return c == "x"
        ? this.network.nodes[index].x
        : this.height - this.network.nodes[index].y;
    }
    return 0;
  }
}
