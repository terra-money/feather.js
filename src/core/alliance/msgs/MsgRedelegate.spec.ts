import { Coin } from '../../Coin';
import { MsgRedelegate } from './MsgRedelegate';

describe('MsgRedelegate', () => {
  it('legacy deserializes MsgRedelegate correctly', () => {
    const data: MsgRedelegate.Amino = {
      type: 'alliance/MsgRedelegate',
      value: {
        delegator_address: 'DelAddr',
        validator_src_address: 'ValAddr',
        validator_dst_address: 'Val1Addr',
        amount: new Coin('uluna', '10').toAmino(),
      },
    };
    const acct = MsgRedelegate.fromAmino(data);
    expect(acct).toMatchObject({
      delegator_address: 'DelAddr',
      validator_src_address: 'ValAddr',
      validator_dst_address: 'Val1Addr',
      amount: new Coin('uluna', '10'),
    });
    expect(acct.toAmino(true)).toMatchObject(data);
  });

  it('match data interface with model MsgRedelegate correctly', () => {
    const data: MsgRedelegate.Data = {
      '@type': '/alliance.alliance.MsgRedelegate',
      delegator_address: 'DelAddr',
      validator_src_address: 'ValAddr',
      validator_dst_address: 'Val1Addr',
      amount: new Coin('uluna', '10').toData(),
    };
    const acct = MsgRedelegate.fromData(data);
    expect(acct).toMatchObject(
      new MsgRedelegate(
        'DelAddr',
        'ValAddr',
        'Val1Addr',
        new Coin('uluna', '10')
      )
    );
    expect(acct.toData(true)).toMatchObject(data);
  });
});
