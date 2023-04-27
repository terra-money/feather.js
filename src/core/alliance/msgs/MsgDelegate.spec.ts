import { Coin } from '../../Coin';
import { MsgDelegate } from './MsgDelegate';

describe('MsgDelegate', () => {
  it('legacy deserializes MsgDelegate correctly', () => {
    const data: MsgDelegate.Amino = {
      type: 'alliance/MsgDelegate',
      value: {
        delegator_address: 'DelAddr',
        validator_address: 'ValAddr',
        amount: new Coin('uluna', '10').toAmino(),
      },
    };
    const acct = MsgDelegate.fromAmino(data);
    expect(acct).toMatchObject({
      delegator_address: 'DelAddr',
      validator_address: 'ValAddr',
      amount: new Coin('uluna', '10'),
    });
    expect(acct.toAmino(true)).toMatchObject(data);
  });

  it('match data interface with model MsgDelegate correctly', () => {
    const data: MsgDelegate.Data = {
      '@type': '/alliance.alliance.MsgDelegate',
      delegator_address: 'DelAddr',
      validator_address: 'ValAddr',
      amount: new Coin('uluna', '10').toData(),
    };
    const acct = MsgDelegate.fromData(data);
    expect(acct).toMatchObject(
      new MsgDelegate('DelAddr', 'ValAddr', new Coin('uluna', '10'))
    );
    expect(acct.toData(true)).toMatchObject(data);
  });
});
