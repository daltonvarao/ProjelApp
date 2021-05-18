import * as db from '../db';

import {IAtividade} from '../db/models/AtividadeSchema';
import {IEquipamento} from '../db/models/EquipamentoSchema';
import {IContrato} from '../db/models/ContratoSchema';
import {IUser} from '../db/models/UserSchema';
import {IEstrutura} from '../db/models/EstruturaSchema';
import {IFuro} from '../db/models/FuroSchema';

interface ApiSyncVersion {
  id: number;
  created_at: number;
  sync_date: Date;
}

interface DataSync {
  atividades?: IAtividade[];
  equipamentos?: IEquipamento[];
  contratos?: IContrato[];
  estruturas?: IEstrutura[];
  furos?: IFuro[];
  users?: IUser[];
  sync_version_id: number;
}

export async function getCurrentSyncVersion() {
  const realm = await db.connect();
  const currentVersion = realm.objects<ApiSyncVersion>('ApiSyncVersion');
  return currentVersion[0];
}

export async function clearOldData() {
  const realm = await db.connect();

  const equipamentos = realm.objects('Equipamento');
  const atividades = realm.objects('Atividade');
  const users = realm.objects('User');
  const contratos = realm.objects('Contrato');
  const estruturas = realm.objects('Estrutura');
  const furos = realm.objects('Furo');

  realm.write(() => {
    realm.delete(equipamentos);
    realm.delete(atividades);
    realm.delete(users);
    realm.delete(contratos);
    realm.delete(estruturas);
    realm.delete(furos);
  });
}

export async function syncWithApi(data: DataSync) {
  const realm = await db.connect();
  const apiSyncVersion = await getCurrentSyncVersion();
  await clearOldData();

  try {
    realm.write(() => {
      data.atividades?.forEach(atividade => {
        realm.create('Atividade', atividade);
      });

      data.users?.forEach(user => {
        realm.create('User', user);
      });

      data.equipamentos?.forEach(equipamento => {
        realm.create('Equipamento', equipamento);
      });

      data.contratos?.forEach(contrato => {
        realm.create('Contrato', contrato);
      });

      data.estruturas?.forEach(estrutura => {
        realm.create('Estrutura', estrutura);
      });

      data.furos?.forEach(furo => {
        realm.create('Furo', furo);
      });

      if (apiSyncVersion) {
        realm.delete(apiSyncVersion);
      }

      realm.create('ApiSyncVersion', {
        id: data.sync_version_id,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function checkLocalData() {
  const realm = await db.connect();

  const rdos = realm.objects('Rdo').filtered('concluido == true');

  return rdos.toJSON();
}

export async function removeLocalData() {
  const realm = await db.connect();

  const rdos = realm.objects('Rdo').filtered('concluido == true');

  realm.write(() => {
    realm.delete(rdos);
  });
}

export async function resetLocalDB() {
  const realm = await db.connect();

  realm.write(() => {
    realm.deleteAll();
  });
}
