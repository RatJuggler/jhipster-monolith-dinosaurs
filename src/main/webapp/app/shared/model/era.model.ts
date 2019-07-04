export interface IEra {
    id?: number;
    name?: string;
    fromMa?: number;
    toMa?: number;
}

export class Era implements IEra {
    constructor(public id?: number, public name?: string, public fromMa?: number, public toMa?: number) {}
}
