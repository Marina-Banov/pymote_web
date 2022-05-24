import { Component, Input, OnInit } from "@angular/core";

import { PymoteNetwork } from "../../models/pymote-models";

@Component({
  selector: "app-network-inspector",
  templateUrl: "./network-inspector.component.html",
  styleUrls: ["./network-inspector.component.scss"],
})
export class NetworkInspectorComponent implements OnInit {
  public _network? = {};
  @Input() set network(n: PymoteNetwork | undefined) {
    if (!n) return;
    this._network = {
      algorithms: n.algorithms,
      algorithmState: n.algorithmState,
    };
  }

  constructor() {}

  ngOnInit(): void {}
}
