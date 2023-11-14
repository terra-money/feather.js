import { MsgChangeAdmin } from './MsgChangeAdmin';

describe('MsgChangeAdmin', () => {
  it('legacy deserializes MsgChangeAdmin correctly', () => {
    const data: MsgChangeAdmin.Amino = {
      type: 'osmosis/tokenfactory/change-admin',
      value: {
        sender: 'terrav1',
        newAdmin: 'terrav2',
        denom: 'uluna',
      },
    };
    const acct = MsgChangeAdmin.fromAmino(data);
    expect(acct).toMatchObject({
      sender: 'terrav1',
      newAdmin: 'terrav2',
      denom: 'uluna',
    });
    expect(acct.toAmino(true)).toMatchObject(data);
  });

  it('match data interface with model MsgChangeAdmin correctly', () => {
    const data: MsgChangeAdmin.Data = {
      '@type': '/osmosis.tokenfactory.v1beta1.MsgChangeAdmin',
      sender: 'terrav1',
      newAdmin: 'terrav2',
      denom: 'uluna',
    };
    const acct = MsgChangeAdmin.fromData(data);
    expect(acct).toMatchObject(
      new MsgChangeAdmin('terrav1', 'terrav2', 'uluna')
    );
    expect(acct.toData(true)).toMatchObject(data);
  });
});
