import { Coin } from '../Coin';
import { MsgMint } from './MsgMint';

describe('MsgMint', () => {
  it('legacy deserializes MsgMint correctly', () => {
    const data: MsgMint.Amino = {
      type: 'osmosis/tokenfactory/mint',
      value: {
        sender: 'MinterAddr',
        amount: new Coin('uluna', '10'),
      },
    };
    const acct = MsgMint.fromAmino(data);
    expect(acct).toMatchObject({
      sender: 'MinterAddr',
      amount: new Coin('uluna', '10'),
    });
    expect(acct.toAmino(true)).toMatchObject(data);
  });

  it('match data interface with model MsgMint correctly', () => {
    const data: MsgMint.Data = {
      '@type': '/osmosis.tokenfactory.v1beta1.MsgMint',
      sender: 'MinterAddr',
      amount: new Coin('uluna', '10'),
    };
    const acct = MsgMint.fromData(data);
    expect(acct).toMatchObject(
      new MsgMint('MinterAddr', new Coin('uluna', '10'))
    );
    expect(acct.toData(true)).toMatchObject(data);
  });
});
