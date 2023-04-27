import { Coin } from '../../Coin';
import { MsgUndelegate } from './MsgUndelegate';

describe('MsgUndelegate', () => {
  it('legacy deserializes MsgUndelegate correctly', () => {
    const data: MsgUndelegate.Amino = {
      type: 'alliance/MsgUndelegate',
      value: {
        delegator_address: 'DelAddr',
        validator_address: 'ValAddr',
        amount: new Coin('uluna', '10').toAmino(),
      },
    };
    const acct = MsgUndelegate.fromAmino(data);
    expect(acct).toMatchObject({
      delegator_address: 'DelAddr',
      validator_address: 'ValAddr',
      amount: new Coin('uluna', '10'),
    });
    expect(acct.toAmino(true)).toMatchObject(data);
  });

  it('match data interface with model MsgUndelegate correctly', () => {
    const data: MsgUndelegate.Data = {
      '@type': '/alliance.alliance.MsgUndelegate',
      delegator_address: 'DelAddr',
      validator_address: 'ValAddr',
      amount: new Coin('uluna', '10').toData(),
    };
    const acct = MsgUndelegate.fromData(data);
    expect(acct).toMatchObject(
      new MsgUndelegate('DelAddr', 'ValAddr', new Coin('uluna', '10'))
    );
    expect(acct.toData(true)).toMatchObject(data);
  });
});
