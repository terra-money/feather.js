import { MsgCancelUnbondingDelegation } from './MsgCancelUnbondingDelegation';
import Long from 'long';
import { Coin } from '../../Coin';

describe('MsgCancelUnbondingDelegation', () => {
  it('deserialize amino', () => {
    const aminoData: MsgCancelUnbondingDelegation.Amino = {
      type: 'cosmos-sdk/MsgCancelUnbondingDelegation',
      value: {
        delegator_address: 'terra1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        validator_address:
          'terravaloper1guxk2q4wn92fw0mchx2rhsenjvq0hj9pzp0ngt',
        creation_height: Long.fromNumber(42),
        amount: {
          denom: 'uluna',
          amount: '8102024952',
        },
      },
    };
    const aminodeserialized = MsgCancelUnbondingDelegation.fromAmino(aminoData);
    expect(aminodeserialized).toMatchObject({
      amount: new Coin('uluna', '8102024952'),
      creation_height: {
        high: 0,
        low: 42,
        unsigned: false,
      },
      delegator_address: 'terra1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      validator_address: 'terravaloper1guxk2q4wn92fw0mchx2rhsenjvq0hj9pzp0ngt',
    });

    expect(aminodeserialized.toAmino()).toMatchObject({
      type: 'cosmos-sdk/MsgCancelUnbondingDelegation',
      value: {
        delegator_address: 'terra1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        validator_address:
          'terravaloper1guxk2q4wn92fw0mchx2rhsenjvq0hj9pzp0ngt',
        creation_height: Long.fromNumber(42),
        amount: {
          denom: 'uluna',
          amount: '8102024952',
        },
      },
    });
  });
});
