import { GovAPI } from './GovAPI';
import { Coins, Dec, Int, Proposal } from '../../../core';
import { Deposit } from '@terra-money/terra.proto/cosmos/gov/v1beta1/gov';
import { LCDClient } from '../LCDClient';

const lcd = LCDClient.fromDefaultConfig('testnet');
const gov = new GovAPI(lcd);

describe('GovAPI', () => {
  it('parameters', async () => {
    await expect(gov.parameters('pisco-1')).resolves.toMatchObject({
      deposit_params: {
        min_deposit: expect.any(Coins),
        max_deposit_period: expect.any(Number),
      },
      voting_params: {
        voting_period: expect.any(Number),
      },
      tally_params: {
        quorum: expect.any(Dec),
        threshold: expect.any(Dec),
        veto_threshold: expect.any(Dec),
      },
    });
  });

  it('tally', async () => {
    const proposalId = await gov.proposals('pisco-1').then(v => v[0][0].id);
    await expect(gov.tally(proposalId, 'pisco-1')).resolves.toMatchObject({
      yes: expect.any(Int),
      abstain: expect.any(Int),
      no: expect.any(Int),
      no_with_veto: expect.any(Int),
    });
  });

  it('proposals', async () => {
    const proposals = await gov.proposals('pisco-1').then(v => v[0]);
    expect(proposals).toContainEqual(expect.any(Proposal));
  });

  it('proposal', async () => {
    const proposalId = await gov.proposals('pisco-1').then(v => v[0][0].id);
    const proposal = await gov.proposal(proposalId, 'pisco-1');
    expect(proposal).toEqual(expect.any(Proposal));
  });

  it('proposer', async () => {
    const proposalId = await gov.proposals('pisco-1').then(v => v[0][0].id);
    const proposer = await gov.proposer(proposalId, 'pisco-1');
    expect(proposer).toEqual(expect.any(String));
  });

  it('initialDeposit', async () => {
    const proposalId = await gov.proposals('pisco-1').then(v => v[0][0].id);
    const initialDeposit = await gov.initialDeposit(proposalId, 'pisco-1');
    expect(initialDeposit).toEqual(expect.any(Coins));
  });

  it('deposits', async () => {
    const proposals = await gov.proposals('pisco-1').then(v => v[0]);
    const proposalId = proposals[0].id;
    const deposits = await gov
      .deposits(proposalId, 'pisco-1')
      .then(v => v[0][0]);
    if (deposits !== undefined) {
      expect(deposits).toEqual(expect.any(Deposit));
    }
  });
});
