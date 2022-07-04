import { Component, Input, OnInit } from "@angular/core";

import { PymoteNode } from "../../models/pymote-models";

@Component({
  selector: "app-node-inspector",
  templateUrl: "./node-inspector.component.html",
  styleUrls: ["../network-inspector/network-inspector.component.scss"],
})
export class NodeInspectorComponent implements OnInit {
  public _node? = {};
  @Input() set node(n: PymoteNode | undefined) {
    if (!n) {
      this._node = {};
    } else {
      this._node = n;
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
