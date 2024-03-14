import { AllianceAPI } from './AllianceAPI';
import { LCDClient } from '../LCDClient';
import { Dec } from '../../../core';
import { RewardWeightRange } from '../../../core/alliance';

const lcd = LCDClient.fromDefaultConfig('testnet');
const alliance = new AllianceAPI(lcd);

describe('AllianceAPI', () => {
  it('params', async () => {
    const params = await alliance.params('pisco-1');

    expect(params.rewardDelayTime).toBeDefined();
    expect(params.takeRateClaimInterval).toBeDefined();
    expect(params.lastTakeRateClaimTime.getDate()).toBeLessThanOrEqual(
      Date.now()
    );
  });

  describe('alliance assets', () => {
    it('query an alliance by denom', async () => {
      const res = await alliance.queryAlliance(
        'pisco-1',
        'factory/terra1zdpgj8am5nqqvht927k3etljyl6a52kwqup0je/utest766e'
      );

      expect(res).toBeDefined();
      expect(res.denom).toBe(
        'factory/terra1zdpgj8am5nqqvht927k3etljyl6a52kwqup0je/utest766e'
      );
      expect(res.rewardWeight.eq(new Dec(0.01))).toBeTruthy();
      expect(res.takeRate.equals(new Dec(0))).toBeTruthy();
      expect(res.totalTokens.greaterThan(new Dec(1))).toBeTruthy();
      expect(res.totalValidatorShares.greaterThan(new Dec(1))).toBeTruthy;
      expect(res.rewardStartTime.getTime()).toBeLessThanOrEqual(Date.now());

      expect(res.rewardChangeRate.equals(new Dec('1'))).toBeTruthy();
      expect(res.rewardChangeInterval).toStrictEqual('6000s');
      expect(res.lastRewardChangeTime.getTime()).toBeLessThanOrEqual(
        Date.now()
      );
      expect(res.rewardWeightRange).toStrictEqual(
        new RewardWeightRange(new Dec(0), new Dec(1))
      );
      expect(res.isInitialized).toBeTruthy();
    });

    it('query all alliances', async () => {
      const res = await alliance.queryAlliances('pisco-1');
      expect(res.pagination).toBeDefined();
      expect(res.alliances.length).toBeGreaterThan(0);

      const allianceAsset = res.alliances[0];
      expect(allianceAsset).toBeDefined();
      expect(allianceAsset.denom).toBe(
        'factory/terra1zdpgj8am5nqqvht927k3etljyl6a52kwqup0je/utest766e'
      );
      expect(allianceAsset.rewardWeight.eq(new Dec(0.01))).toBeTruthy();
      expect(allianceAsset.takeRate.equals(new Dec(0))).toBeTruthy();
      expect(allianceAsset.totalTokens.greaterThan(new Dec(1))).toBeTruthy();
      expect(allianceAsset.totalValidatorShares.greaterThan(new Dec(1)))
        .toBeTruthy;
      expect(allianceAsset.rewardStartTime.getTime()).toBeLessThanOrEqual(
        Date.now()
      );

      expect(allianceAsset.rewardChangeRate.equals(new Dec('1'))).toBeTruthy();
      expect(allianceAsset.rewardChangeInterval).toStrictEqual('6000s');
      expect(allianceAsset.lastRewardChangeTime.getTime()).toBeLessThanOrEqual(
        Date.now()
      );
      expect(allianceAsset.rewardWeightRange).toStrictEqual(
        new RewardWeightRange(new Dec(0), new Dec(1))
      );
      expect(allianceAsset.isInitialized).toBeTruthy();
    });
  });

  describe('delegations', () => {
    it('query all', async () => {
      const res = await alliance.queryAllianceDelegations('pisco-1');
      expect(res.delegations.length).toBeGreaterThan(10);
      expect(res.pagination).toBeDefined();
    });

    it('query all by delegator', async () => {
      const res = await alliance.queryAllianceDelegations(
        'pisco-1',
        'terra1eaxcahzxp0x8wqejqjlqaey53tp06l728qad6z395lyzgl026qkq20xj43'
      );
      expect(res.delegations.length).toBeGreaterThan(0);
      expect(res.pagination).toBeDefined();
    });

    it('query all by delegator and validator', async () => {
      const res = await alliance.queryAllianceDelegations(
        'pisco-1',
        'terra1eaxcahzxp0x8wqejqjlqaey53tp06l728qad6z395lyzgl026qkq20xj43',
        'terravaloper1zdpgj8am5nqqvht927k3etljyl6a52kwqndjz2'
      );
      expect(res.delegations.length).toBeGreaterThan(0);
      expect(res.pagination).toBeDefined();
    });

    it('query all by delegator, validator and denom', async () => {
      const res = await alliance.queryAllianceDelegations(
        'pisco-1',
        'terra1eaxcahzxp0x8wqejqjlqaey53tp06l728qad6z395lyzgl026qkq20xj43',
        'terravaloper1zdpgj8am5nqqvht927k3etljyl6a52kwqndjz2',
        'factory/terra1eaxcahzxp0x8wqejqjlqaey53tp06l728qad6z395lyzgl026qkq20xj43/ualliance'
      );
      expect(res.delegations.length).toBeGreaterThan(0);
      expect(res.pagination).toBeDefined();
    });

    it('with missing incremental params', async () => {
      await alliance
        .queryAllianceDelegations(
          'pisco-1',
          undefined,
          'terra1eaxcahzxp0x8wqejqjlqaey53tp06l728qad6z395lyzgl026qkq20xj43'
        )
        .catch((e: Error) => {
          expect(e.message).toStrictEqual(
            'DELEGATOR ADDRESS must be provided when VALIDATOR ADDRESS is provided!!'
          );
        });

      await alliance
        .queryAllianceDelegations(
          'pisco-1',
          'terra1eaxcahzxp0x8wqejqjlqaey53tp06l728qad6z395lyzgl026qkq20xj43',
          undefined,
          'factory/terra1eaxcahzxp0x8wqejqjlqaey53tp06l728qad6z395lyzgl026qkq20xj43/ualliance'
        )
        .catch((e: Error) => {
          expect(e.message).toStrictEqual(
            'VALIDATOR ADDRESS must be provided when ALLIANCE DENOM is provided!!'
          );
        });
    });
  });
});
