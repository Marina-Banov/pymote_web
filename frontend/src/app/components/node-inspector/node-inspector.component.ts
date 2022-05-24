import { Component, Input, OnInit } from "@angular/core";
import { PymoteNode } from "../../models/pymote-models";

@Component({
  selector: "app-node-inspector",
  templateUrl: "./node-inspector.component.html",
  styleUrls: ["../network-inspector/network-inspector.component.scss"],
})
export class NodeInspectorComponent implements OnInit {
  @Input() node?: PymoteNode;

  constructor() {}

  ngOnInit(): void {}
}
