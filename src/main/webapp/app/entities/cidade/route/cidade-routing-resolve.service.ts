import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICidade } from '../cidade.model';
import { CidadeService } from '../service/cidade.service';

@Injectable({ providedIn: 'root' })
export class CidadeRoutingResolveService implements Resolve<ICidade | null> {
  constructor(protected service: CidadeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICidade | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cidade: HttpResponse<ICidade>) => {
          if (cidade.body) {
            return of(cidade.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
