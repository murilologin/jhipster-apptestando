import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CidadeService } from '../service/cidade.service';

import { CidadeComponent } from './cidade.component';

describe('Cidade Management Component', () => {
  let comp: CidadeComponent;
  let fixture: ComponentFixture<CidadeComponent>;
  let service: CidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'cidade', component: CidadeComponent }]), HttpClientTestingModule],
      declarations: [CidadeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(CidadeComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CidadeComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CidadeService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.cidades?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to cidadeService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getCidadeIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getCidadeIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
