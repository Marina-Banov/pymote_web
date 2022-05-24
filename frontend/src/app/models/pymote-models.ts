export class PymoteNetwork {
  algorithms?: {};
  algorithmState?: PymoteAlgorithmState;
  nodes: PymoteNode[] = [];
  links: PymoteLink[] = [];
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
  inbox?: {};
  outbox?: {};
  range?: number;
}

export class PymoteLink {
  source?: number;
  target?: number;
  weight?: number;
}
