import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEra, getEraIdentifier } from '../era.model';

export type EntityResponseType = HttpResponse<IEra>;
export type EntityArrayResponseType = HttpResponse<IEra[]>;

@Injectable({ providedIn: 'root' })
export class EraService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/eras');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(era: IEra): Observable<EntityResponseType> {
    return this.http.post<IEra>(this.resourceUrl, era, { observe: 'response' });
  }

  update(era: IEra): Observable<EntityResponseType> {
    return this.http.put<IEra>(`${this.resourceUrl}/${getEraIdentifier(era) as number}`, era, { observe: 'response' });
  }

  partialUpdate(era: IEra): Observable<EntityResponseType> {
    return this.http.patch<IEra>(`${this.resourceUrl}/${getEraIdentifier(era) as number}`, era, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEra>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEra[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEraToCollectionIfMissing(eraCollection: IEra[], ...erasToCheck: (IEra | null | undefined)[]): IEra[] {
    const eras: IEra[] = erasToCheck.filter(isPresent);
    if (eras.length > 0) {
      const eraCollectionIdentifiers = eraCollection.map(eraItem => getEraIdentifier(eraItem)!);
      const erasToAdd = eras.filter(eraItem => {
        const eraIdentifier = getEraIdentifier(eraItem);
        if (eraIdentifier == null || eraCollectionIdentifiers.includes(eraIdentifier)) {
          return false;
        }
        eraCollectionIdentifiers.push(eraIdentifier);
        return true;
      });
      return [...erasToAdd, ...eraCollection];
    }
    return eraCollection;
  }
}
