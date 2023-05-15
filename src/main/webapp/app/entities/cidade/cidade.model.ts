import { ICliente } from 'app/entities/cliente/cliente.model';

export interface ICidade {
  id: number;
  nome?: string | null;
  uf?: string | null;
  cliente?: Pick<ICliente, 'id'> | null;
}

export type NewCidade = Omit<ICidade, 'id'> & { id: null };
