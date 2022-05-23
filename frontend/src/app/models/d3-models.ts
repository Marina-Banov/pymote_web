import { SimulationNodeDatum, SimulationLinkDatum } from "d3";

export class D3Network {
  directed = false;
  graph = {};
  nodes: D3Node[] = [];
  links: D3Link[] = [];
  multigraph = false;
}

export class D3Node implements SimulationNodeDatum {
  id = 0;
  x = 0;
  y = 0;
  index = 0;
  vx?: number | undefined;
  vy?: number | undefined;
  fx?: number | null | undefined;
  fy?: number | null | undefined;
}

export class D3Link implements SimulationLinkDatum<D3Node> {
  source: number | D3Node | string = 0;
  target: number | D3Node | string = 0;
  index?: number | undefined;
  weight?: number | undefined;
}
