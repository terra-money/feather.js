import { MsgClaimDelegationRewards } from './MsgClaimDelegationRewards';

describe('MsgClaimDelegationRewards', () => {
  it('legacy deserializes MsgClaimDelegationRewards correctly', () => {
    const data: MsgClaimDelegationRewards.Amino = {
      type: 'alliance/MsgClaimDelegationRewards',
      value: {
        delegator_address: 'DelAddr',
        validator_address: 'ValAddr',
        denom: 'Denom',
      },
    };
    const acct = MsgClaimDelegationRewards.fromAmino(data);
    expect(acct).toMatchObject({
      delegator_address: 'DelAddr',
      validator_address: 'ValAddr',
      denom: 'Denom',
    });
    expect(acct.toAmino(true)).toMatchObject(data);
  });

  it('match data interface with model MsgClaimDelegationRewards correctly', () => {
    const data: MsgClaimDelegationRewards.Data = {
      '@type': '/alliance.alliance.MsgClaimDelegationRewards',
      delegator_address: 'DelAddr',
      validator_address: 'ValAddr',
      denom: 'Denom',
    };
    const acct = MsgClaimDelegationRewards.fromData(data);
    expect(acct).toMatchObject(
      new MsgClaimDelegationRewards('DelAddr', 'ValAddr', 'Denom')
    );
    expect(acct.toData(true)).toMatchObject(data);
  });
});
