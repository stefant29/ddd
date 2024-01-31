import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUser1, NewUser1 } from '../user-1.model';

export type PartialUpdateUser1 = Partial<IUser1> & Pick<IUser1, 'id'>;

export type EntityResponseType = HttpResponse<IUser1>;
export type EntityArrayResponseType = HttpResponse<IUser1[]>;

@Injectable({ providedIn: 'root' })
export class User1Service {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/user-1-s');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(user1: NewUser1): Observable<EntityResponseType> {
    return this.http.post<IUser1>(this.resourceUrl, user1, { observe: 'response' });
  }

  update(user1: IUser1): Observable<EntityResponseType> {
    return this.http.put<IUser1>(`${this.resourceUrl}/${this.getUser1Identifier(user1)}`, user1, { observe: 'response' });
  }

  partialUpdate(user1: PartialUpdateUser1): Observable<EntityResponseType> {
    return this.http.patch<IUser1>(`${this.resourceUrl}/${this.getUser1Identifier(user1)}`, user1, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IUser1>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUser1[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUser1Identifier(user1: Pick<IUser1, 'id'>): string {
    return user1.id;
  }

  compareUser1(o1: Pick<IUser1, 'id'> | null, o2: Pick<IUser1, 'id'> | null): boolean {
    return o1 && o2 ? this.getUser1Identifier(o1) === this.getUser1Identifier(o2) : o1 === o2;
  }

  addUser1ToCollectionIfMissing<Type extends Pick<IUser1, 'id'>>(
    user1Collection: Type[],
    ...user1sToCheck: (Type | null | undefined)[]
  ): Type[] {
    const user1s: Type[] = user1sToCheck.filter(isPresent);
    if (user1s.length > 0) {
      const user1CollectionIdentifiers = user1Collection.map(user1Item => this.getUser1Identifier(user1Item)!);
      const user1sToAdd = user1s.filter(user1Item => {
        const user1Identifier = this.getUser1Identifier(user1Item);
        if (user1CollectionIdentifiers.includes(user1Identifier)) {
          return false;
        }
        user1CollectionIdentifiers.push(user1Identifier);
        return true;
      });
      return [...user1sToAdd, ...user1Collection];
    }
    return user1Collection;
  }
}
