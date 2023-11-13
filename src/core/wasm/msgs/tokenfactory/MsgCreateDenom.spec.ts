import { MsgCreateDenom } from './MsgCreateDenom';

describe('MsgCreateDenom', () => {
  it('legacy deserializes MsgCreateDenom correctly', () => {
    const data: MsgCreateDenom.Amino = {
      type: 'osmosis/tokenfactory/create-denom',
      value: {
        sender: 'terra',
        subdenom: 'uluna',
      },
    };
    const acct = MsgCreateDenom.fromAmino(data);
    expect(acct).toMatchObject({
      sender: 'terra',
      subdenom: 'uluna',
    });
    expect(acct.toAmino(true)).toMatchObject(data);
  });

  it('match data interface with model MsgCreateDenom correctly', () => {
    const data: MsgCreateDenom.Data = {
      '@type': '/osmosis.tokenfactory.v1beta1.MsgCreateDenom',
      sender: 'terra',
      subdenom: 'uluna',
    };
    const acct = MsgCreateDenom.fromData(data);
    expect(acct).toMatchObject(new MsgCreateDenom('terra', 'uluna'));
    expect(acct.toData(true)).toMatchObject(data);
  });
});
