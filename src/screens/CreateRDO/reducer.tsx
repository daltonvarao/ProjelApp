import {IRdo} from '../../db/models/RdoSchema';

export interface State extends IRdo {}

export const initialState: State = {
  nome: '',
  condicoesTempo: 'bom',
  data: new Date(),
  pluviometria: 0,
  status: 'andamento',
  rdoId: Date.now(),
  concluido: false,
  users: [],
  equipamentos: [],
  atividades: [],
};

export interface Action {
  type: 'CHANGE_STATE' | 'CHANGE_ALL' | 'DONE';
  field?: keyof State;
  value?: any;
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CHANGE_STATE':
      if (action.field) {
        return {...state, [action.field]: action.value};
      }
      return state;
    case 'CHANGE_ALL':
      return {...state, ...action.value};

    case 'DONE':
      return {
        ...state,
        concluido: true,
      };

    default:
      return state;
  }
}
