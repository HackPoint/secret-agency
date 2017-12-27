export interface Agent {
  agent: string;
  country: string;
  address: string;
  date: number;
  distance: number;
}


export class Serializable {
  constructor(json?: any) {
    if (json) {
      Object.assign(this, json);
    }
  }
}

export class Agent extends Serializable implements Agent {
  constructor(json: string) {
    super(json);
  }
}

