import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import {
  PymoteMessage,
  PymoteNetwork,
  PymoteNode,
} from "../../models/pymote-models";
import { ControlsService } from "../../services/controls.service";

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
  ];
  public colorMap: any = {};

  public _network?: PymoteNetwork;
  @Input() set network(n: PymoteNetwork | undefined) {
    if (!n) return;
    this._network = n;
    this._network.currentAlgorithm?.statusKeys.forEach((key, index) => {
      if (key == "IDLE") {
        this.colorMap[key] = "#000000";
      } else {
        this.colorMap[key] = this.colors[index % this.colors.length];
      }
    });
  }
  @Output() selectNode: EventEmitter<PymoteNode>;

  constructor(public controlsService: ControlsService) {
    this.selectNode = new EventEmitter();
  }

  ngOnInit(): void {}

  public getIndex(id: number | undefined): number | undefined {
    if (id == undefined) {
      return undefined;
    }
    return this._network?.nodes.map((n) => n.info?.id).indexOf(id);
  }

  private getPos(index: number | undefined): number[] | undefined {
    if (index != undefined) {
      return this._network?.nodes[index]?.info?.position;
    }
    return undefined;
  }

  public getMessages(node: PymoteNode): PymoteMessage[] {
    const msgs = [];

    if (node.communication && node.communication.inbox) {
      for (const m of node.communication.inbox) {
        msgs.push({ ...m, direction: "in" });
      }
    }

    if (node.communication && node.communication.outbox) {
      for (const m of node.communication.outbox) {
        msgs.push({ ...m, direction: "out" });
      }
    }

    return msgs;
  }

  public getCoordinate(index: any, c: string): number {
    if (typeof index == "number") {
      const pos = this.getPos(index);
      if (pos) {
        return c == "x" ? pos[0] : this.height - (pos[1] || 0);
      }
    }
    return 0;
  }

  public getCoordinateFromMessage(msg: PymoteMessage, c: string): number {
    const destIndex = this.getIndex(msg.destination);
    const srcIndex = this.getIndex(msg.source);
    const destPos = this.getPos(destIndex);
    const srcPos = this.getPos(srcIndex);
    if (!destPos) {
      return 0;
    }
    if (!srcPos) {
      return c == "x" ? destPos[0] : this.height - destPos[1];
    }
    // middle point
    let res = [(destPos[0] + srcPos[0]) / 2, (destPos[1] + srcPos[1]) / 2];
    if (msg.direction == "out") {
      // one quarter from source
      res = [(srcPos[0] + res[0]) / 2, (srcPos[1] + res[1]) / 2];
      // one eighth from source
      res = [(srcPos[0] + res[0]) / 2, (srcPos[1] + res[1]) / 2];
    } else {
      // one quarter from destination
      res = [(destPos[0] + res[0]) / 2, (destPos[1] + res[1]) / 2];
      // one eighth from destination
      res = [(destPos[0] + res[0]) / 2, (destPos[1] + res[1]) / 2];
      // one sixteenth from destination
      res = [(destPos[0] + res[0]) / 2, (destPos[1] + res[1]) / 2];
    }
    return c == "x" ? res[0] : this.height - res[1];
  }

  public onNodeClick(node: PymoteNode): void {
    this.selectNode.emit(node);
  }
}
