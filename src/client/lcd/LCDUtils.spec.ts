import { LCDClient } from './LCDClient';
import { LCDUtils } from './LCDUtils';
import { Validator } from '../../core';

const lcdUtils = new LCDUtils(LCDClient.fromDefaultConfig('testnet'));

describe('LCDUtils', () => {
  it('validatorsWithVotingPower', async () => {
    const vwv = await lcdUtils.validatorsWithVotingPower('pisco-1');

    expect(vwv[Object.keys(vwv)[0]]).toMatchObject({
      validatorInfo: expect.any(Validator),
      votingPower: expect.any(Number),
      proposerPriority: expect.any(Number),
    });
  });
});
