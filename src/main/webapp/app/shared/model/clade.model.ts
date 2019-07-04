export interface IClade {
  id?: number;
  description?: string;
}

export class Clade implements IClade {
  constructor(public id?: number, public description?: string) {}
}
