export interface IEra {
  id?: number;
  name?: string;
  fromMa?: number | null;
  toMa?: number | null;
}

export class Era implements IEra {
  constructor(public id?: number, public name?: string, public fromMa?: number | null, public toMa?: number | null) {}
}

export function getEraIdentifier(era: IEra): number | undefined {
  return era.id;
}
