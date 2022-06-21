export class PymoteNetwork {
  algorithms?: {};
  algorithmState?: PymoteAlgorithmState;
  currentAlgorithm?: PymoteAlgorithm;
  nodes: PymoteNode[] = [];
  links: PymoteLink[] = [];
  treeEdges: number[][] = [];
}

class PymoteAlgorithm {
  statusKeys: string[] = [];
}

class PymoteAlgorithmState {
  name?: string;
  step?: number;
  finished?: boolean;
}

export class PymoteNode {
  info?: PymoteNodeInfo;
  communication?: PymoteNodeCommunication;
  memory?: {};
  sensors?: {};
}

class PymoteNodeInfo {
  id?: number;
  status?: string;
  position: number[] = [];
  orientation?: number;
}

class PymoteNodeCommunication {
  inbox: PymoteMessage[] = [];
  outbox: PymoteMessage[] = [];
  range?: number;
}

export class PymoteMessage {
  data: any;
  destination?: number;
  source?: number;
  header?: string;
  direction?: string;
}

export class PymoteLink {
  source?: number;
  target?: number;
  weight?: number;
}
