import * as db from '../db';
import * as sync from './sync';

import {IApiSyncVersion} from '../db/models/ApiSyncVersionSchema';
import {IAtividade} from '../db/models/AtividadeSchema';
import {IUser} from '../db/models/UserSchema';
import {IContrato} from '../db/models/ContratoSchema';

afterEach(async () => {
  const realm = await db.connect();

  realm.write(() => {
    realm.deleteAll();
  });

  realm.close();
});

describe('SyncService', () => {
  it('should sync.getCurrentSyncVersion returns current apiSyncVersion', async () => {
    const realm = await db.connect();

    realm.write(() => {
      realm.create('ApiSyncVersion', {
        id: 40,
        created_at: Date.now(),
      });
    });

    const apiSyncVersion = await sync.getCurrentSyncVersion();

    expect(apiSyncVersion.id).toEqual(40);

    realm.close();
  });

  it('should sync.clearOldData deletes all data localy stored', async () => {
    const realm = await db.connect();

    realm.write(() => {
      realm.create('ApiSyncVersion', {
        id: 40,
        created_at: Date.now(),
      });

      realm.create('User', {
        nome: 'dalton',
        cpf: '12345678911',
        id: 1,
        cargoId: 1,
      });
      realm.create('Atividade', {descricao: 'DDS', tipo: 'improdutiva', id: 1});
    });

    const user = realm.objects<IUser>('User')[0];
    expect(user.nome).toEqual('dalton');

    await sync.clearOldData();

    const emptyUsers = realm.objects<IUser>('User');
    const emptyAtividades = realm.objects<IAtividade>('Atividade');

    expect(emptyUsers).toHaveLength(0);
    expect(emptyAtividades).toHaveLength(0);

    const apiSyncVersion = realm.objects<IApiSyncVersion>('ApiSyncVersion');
    expect(apiSyncVersion).toHaveLength(1);

    realm.close();
  });

  it('should sync.syncWithApi stores all data from api call', async () => {
    const realm = await db.connect();

    realm.write(() => {
      realm.create('ApiSyncVersion', {
        id: 40,
        created_at: Date.now(),
      });
    });

    const api = {
      users: [{nome: 'dalton', cpf: '12345678911', id: 1, cargoId: 1}],
      atividades: [{descricao: 'DDS', id: 1, tipo: 'parada'}] as IAtividade[],
      contratos: [{descricao: 'Projel MG', id: 1, numero: '2021/03'}],
      sync_version_id: 1,
    };

    await sync.syncWithApi(api);

    const user = realm.objects<IUser>('User')[0];
    expect(user.nome).toEqual('dalton');

    const atividade = realm.objects<IAtividade>('Atividade')[0];
    expect(atividade.descricao).toEqual('DDS');

    const contrato = realm.objects<IContrato>('Contrato')[0];
    expect(contrato.descricao).toEqual(api.contratos[0].descricao);

    const apiSyncVersion = realm.objects<IApiSyncVersion>('ApiSyncVersion');
    expect(apiSyncVersion).toHaveLength(1);

    realm.close();
  });

  it('should sync.checkLocalData gets "Rdo.concluido = true" to send to server', async () => {
    const realm = await db.connect();

    realm.write(() => {
      realm.create('Rdo', {
        nome: 'Sondagem',
        concluido: true,
        turno: '1T',
        rdoId: Date.now(),
        condicoesTempo: 'normal',
        data: new Date(),
        pluviometria: 0,
        status: 'aberto',
        usersId: [],
        equipamentos: [],
        atividades: [],
      });

      realm.create('Rdo', {
        nome: 'Sondagem 2',
        turno: '1T',
        concluido: true,
        rdoId: Date.now() + 1,
        condicoesTempo: 'normal',
        data: new Date(),
        pluviometria: 0,
        status: 'aberto',
        usersId: [],
        equipamentos: [],
        atividades: [],
      });

      realm.create('Rdo', {
        nome: 'Sondagem Mista',
        turno: '1T',
        concluido: false,
        rdoId: Date.now() + 2,
        condicoesTempo: 'normal',
        data: new Date(),
        pluviometria: 0,
        status: 'aberto',
        usersId: [],
        equipamentos: [],
        atividades: [],
      });
    });

    const localData = await sync.checkLocalData();
    expect(localData).toHaveLength(2);

    realm.close();
  });
});
