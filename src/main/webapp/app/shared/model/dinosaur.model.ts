import { Moment } from 'moment';

export const enum Diet {
    HERBIVORE = 'HERBIVORE',
    CARNIVORE = 'CARNIVORE',
    OMNIVORE = 'OMNIVORE'
}

export interface IDinosaur {
    id?: number;
    name?: string;
    weight?: number;
    length?: number;
    diet?: Diet;
    insertDt?: Moment;
    modifiedDt?: Moment;
    eraName?: string;
    eraId?: number;
    cladeDescription?: string;
    cladeId?: number;
}

export class Dinosaur implements IDinosaur {
    constructor(
        public id?: number,
        public name?: string,
        public weight?: number,
        public length?: number,
        public diet?: Diet,
        public insertDt?: Moment,
        public modifiedDt?: Moment,
        public eraName?: string,
        public eraId?: number,
        public cladeDescription?: string,
        public cladeId?: number
    ) {}
}
