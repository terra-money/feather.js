import { Coin } from '../../../Coin';
import { MsgBurn } from './MsgBurn';

describe('MsgBurn', () => {
  it('legacy deserializes MsgBurn correctly', () => {
    const data: MsgBurn.Amino = {
      type: 'osmosis/tokenfactory/burn',
      value: {
        sender: 'MinterAddr',
        amount: new Coin('uluna', '10'),
      },
    };
    const acct = MsgBurn.fromAmino(data);
    expect(acct).toMatchObject({
      sender: 'MinterAddr',
      amount: new Coin('uluna', '10'),
    });
    expect(acct.toAmino(true)).toMatchObject(data);
  });

  it('match data interface with model MsgBurn correctly', () => {
    const data: MsgBurn.Data = {
      '@type': '/osmosis.tokenfactory.v1beta1.MsgBurn',
      sender: 'MinterAddr',
      amount: new Coin('uluna', '10'),
    };
    const acct = MsgBurn.fromData(data);
    expect(acct).toMatchObject(
      new MsgBurn('MinterAddr', new Coin('uluna', '10'))
    );
    expect(acct.toData(true)).toMatchObject(data);
  });
});
