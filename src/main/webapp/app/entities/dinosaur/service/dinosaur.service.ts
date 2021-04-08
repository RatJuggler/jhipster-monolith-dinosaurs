import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDinosaur, getDinosaurIdentifier } from '../dinosaur.model';

export type EntityResponseType = HttpResponse<IDinosaur>;
export type EntityArrayResponseType = HttpResponse<IDinosaur[]>;

@Injectable({ providedIn: 'root' })
export class DinosaurService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/dinosaurs');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(dinosaur: IDinosaur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dinosaur);
    return this.http
      .post<IDinosaur>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(dinosaur: IDinosaur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dinosaur);
    return this.http
      .put<IDinosaur>(`${this.resourceUrl}/${getDinosaurIdentifier(dinosaur) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(dinosaur: IDinosaur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dinosaur);
    return this.http
      .patch<IDinosaur>(`${this.resourceUrl}/${getDinosaurIdentifier(dinosaur) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDinosaur>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDinosaur[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDinosaurToCollectionIfMissing(dinosaurCollection: IDinosaur[], ...dinosaursToCheck: (IDinosaur | null | undefined)[]): IDinosaur[] {
    const dinosaurs: IDinosaur[] = dinosaursToCheck.filter(isPresent);
    if (dinosaurs.length > 0) {
      const dinosaurCollectionIdentifiers = dinosaurCollection.map(dinosaurItem => getDinosaurIdentifier(dinosaurItem)!);
      const dinosaursToAdd = dinosaurs.filter(dinosaurItem => {
        const dinosaurIdentifier = getDinosaurIdentifier(dinosaurItem);
        if (dinosaurIdentifier == null || dinosaurCollectionIdentifiers.includes(dinosaurIdentifier)) {
          return false;
        }
        dinosaurCollectionIdentifiers.push(dinosaurIdentifier);
        return true;
      });
      return [...dinosaursToAdd, ...dinosaurCollection];
    }
    return dinosaurCollection;
  }

  protected convertDateFromClient(dinosaur: IDinosaur): IDinosaur {
    return Object.assign({}, dinosaur, {
      insertDt: dinosaur.insertDt?.isValid() ? dinosaur.insertDt.toJSON() : undefined,
      modifiedDt: dinosaur.modifiedDt?.isValid() ? dinosaur.modifiedDt.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.insertDt = res.body.insertDt ? dayjs(res.body.insertDt) : undefined;
      res.body.modifiedDt = res.body.modifiedDt ? dayjs(res.body.modifiedDt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((dinosaur: IDinosaur) => {
        dinosaur.insertDt = dinosaur.insertDt ? dayjs(dinosaur.insertDt) : undefined;
        dinosaur.modifiedDt = dinosaur.modifiedDt ? dayjs(dinosaur.modifiedDt) : undefined;
      });
    }
    return res;
  }
}
