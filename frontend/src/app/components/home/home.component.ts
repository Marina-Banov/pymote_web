import { Component, OnInit } from "@angular/core";
import * as d3 from "d3";

import { D3Network } from "../../models/d3-models";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public network: D3Network;

  constructor() {
    this.network = new D3Network();
  }

  ngOnInit(): void {}

  public updateNetwork(network: D3Network): void {
    this.network = network;
    this.drawNetwork();
  }

  private drawNetwork() {
    const margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 620 - margin.left - margin.right,
      height = 620 - margin.top - margin.bottom;

    const svg = d3
      .select("#network")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .selectAll("line")
      .data(this.network.links)
      .enter()
      .append("line")
      .attr("x1", (d) => this.getCoordinate(d.source, "x"))
      .attr("y1", (d) => height - this.getCoordinate(d.source, "y"))
      .attr("x2", (d) => this.getCoordinate(d.target, "x"))
      .attr("y2", (d) => height - this.getCoordinate(d.target, "y"))
      .style("stroke", "#777777");

    svg
      .selectAll("circle")
      .data(this.network.nodes)
      .enter()
      .append("circle")
      .attr("r", 6)
      .attr("cy", (d) => height - d.y)
      .attr("cx", (d) => d.x)
      .style("fill", "#ff0000");
  }

  private getCoordinate(index: any, c: string) {
    if (typeof index == "number") {
      return c == "x"
        ? this.network.nodes[index].x
        : this.network.nodes[index].y;
    }
    return 0;
  }
}
