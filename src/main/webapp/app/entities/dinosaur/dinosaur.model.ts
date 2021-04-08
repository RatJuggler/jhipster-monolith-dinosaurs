import * as dayjs from 'dayjs';
import { IEra } from 'app/entities/era/era.model';
import { IClade } from 'app/entities/clade/clade.model';
import { Diet } from 'app/entities/enumerations/diet.model';

export interface IDinosaur {
  id?: number;
  name?: string;
  weight?: number | null;
  length?: number | null;
  diet?: Diet | null;
  insertDt?: dayjs.Dayjs;
  modifiedDt?: dayjs.Dayjs;
  era?: IEra | null;
  clade?: IClade | null;
}

export class Dinosaur implements IDinosaur {
  constructor(
    public id?: number,
    public name?: string,
    public weight?: number | null,
    public length?: number | null,
    public diet?: Diet | null,
    public insertDt?: dayjs.Dayjs,
    public modifiedDt?: dayjs.Dayjs,
    public era?: IEra | null,
    public clade?: IClade | null
  ) {}
}

export function getDinosaurIdentifier(dinosaur: IDinosaur): number | undefined {
  return dinosaur.id;
}
