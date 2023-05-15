import { ICidade, NewCidade } from './cidade.model';

export const sampleWithRequiredData: ICidade = {
  id: 24398,
};

export const sampleWithPartialData: ICidade = {
  id: 21927,
};

export const sampleWithFullData: ICidade = {
  id: 702,
  nome: 'Savings',
  uf: 'parsing User-friendly',
};

export const sampleWithNewData: NewCidade = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
