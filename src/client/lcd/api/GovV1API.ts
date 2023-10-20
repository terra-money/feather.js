import { BaseAPI } from './BaseAPI';
import { Proposal } from '../../../core/gov/v1/Proposal';

import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import {
  DepositParams,
  VotingParams,
  TallyParams,
} from '@terra-money/terra.proto/cosmos/gov/v1/gov';
import { AccAddress, Coins, Deposit, Int, Vote } from '../../../core';
import Decimal from 'decimal.js';
import { Tally } from '../../../core/gov/v1/Tally';

interface GovV1APIParams {
  params: {
    min_deposit: Coins.Input;
    max_deposit_period: string;
    voting_period: string;
    quorum: Decimal.Value;
    threshold: Decimal.Value;
    veto_threshold: Decimal.Value;
    min_initial_deposit_ratio: Decimal.Value;
    burn_vote_quorum: boolean;
    burn_proposal_deposit_prevote: boolean;
    burn_vote_veto: boolean;
  };
}

type GovV1AllParams = {
  params: GovV1APIParams;
  deposit_params: DepositParams;
  voting_params: VotingParams;
  tally_params: TallyParams;
};

export class GovV1API extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  /** Gets the Gov module's current parameters  */
  public async params(
    chainID: string,
    params: APIParams = {}
  ): Promise<GovV1AllParams> {
    const [res, res1, res2] = await Promise.all([
      this.depositParams(chainID, params),
      this.votingParams(chainID, params),
      this.tallyParams(chainID, params),
    ]);
    return {
      deposit_params: res.deposit_params,
      voting_params: res1.voting_params,
      tally_params: res2.tally_params,
      params: res.params,
    };
  }

  /** Gets the Gov module's deposit parameters */
  public async depositParams(
    chainID: string,
    params: APIParams = {}
  ): Promise<{ deposit_params: DepositParams; params: GovV1APIParams }> {
    return this.getReqFromChainID(chainID).get<{
      deposit_params: DepositParams;
      params: GovV1APIParams;
    }>(`/cosmos/gov/v1/params/deposit`, params);
  }

  /** Gets the Gov module's voting parameters */
  public async votingParams(
    chainID: string,
    params: APIParams = {}
  ): Promise<{ voting_params: VotingParams; params: GovV1APIParams }> {
    return this.getReqFromChainID(chainID).get<{
      voting_params: VotingParams;
      params: GovV1APIParams;
    }>(`/cosmos/gov/v1/params/voting`, params);
  }

  /** Gets teh Gov module's tally parameters */
  public async tallyParams(
    chainID: string,
    params: APIParams = {}
  ): Promise<{
    tally_params: TallyParams;
    params: GovV1APIParams;
  }> {
    return this.getReqFromChainID(chainID).get<{
      tally_params: TallyParams;
      params: GovV1APIParams;
    }>(`/cosmos/gov/v1/params/tallying`, params);
  }

  /**
   * Query all proposals using the gov v1 API.
   */
  public async proposals(
    chainID: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<{
    proposals: Proposal[];
    pagination: Pagination;
  }> {
    return this.getReqFromChainID(chainID)
      .get<{ proposals: Proposal[]; pagination: Pagination }>(
        `/cosmos/gov/v1/proposals`,
        params
      )
      .then(d => {
        return {
          proposals: d.proposals.map(prop => Proposal.fromData(prop as any)),
          pagination: d.pagination,
        };
      });
  }

  /**
   * Get the deposits for a proposal
   * @param proposalId proposal's ID
   * @param chainID chain id
   */
  public async deposits(
    chainID: string,
    proposalId: number,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<{ deposits: Deposit[]; pagination: Pagination }> {
    return this.getReqFromChainID(chainID)
      .get<{ deposits: Deposit.Data[]; pagination: Pagination }>(
        `/cosmos/gov/v1/proposals/${proposalId}/deposits`,
        params
      )
      .then(d => {
        return {
          deposits: d.deposits.map(deposit => Deposit.fromData(deposit)),
          pagination: d.pagination,
        };
      });
  }

  /**
   * Get current deposits for a proposal by voter address
   * @param proposalId proposal's ID
   * @param address address of the depositor
   */
  public async depositsByAddress(
    proposalId: number,
    address: AccAddress
  ): Promise<{ deposit: Deposit }> {
    return this.getReqFromAddress(address)
      .get<{ deposit: Deposit.Data }>(
        `/cosmos/gov/v1beta1/proposals/${proposalId}/deposits/${address}`
      )
      .then(d => {
        return {
          deposit: Deposit.fromData(d.deposit),
        };
      });
  }

  /**
   * Gets the current tally for a proposal.
   * @param proposalId proposal's ID
   * @param chainID chain id
   */
  public async tally(
    chainID: string,
    proposalId: number,
    params: APIParams = {}
  ): Promise<Tally> {
    return this.getReqFromChainID(chainID)
      .get<{ tally: Tally }>(
        `/cosmos/gov/v1/proposals/${proposalId}/tally`,
        params
      )
      .then(({ tally: d }) => ({
        yes_count: new Int(d.yes_count),
        no_count: new Int(d.no_count),
        no_with_veto_count: new Int(d.no_with_veto_count),
        abstain_count: new Int(d.abstain_count),
      }));
  }

  /**
   * Get the current votes for a proposal
   * @param proposalId proposal's ID
   * @param chainID chain id
   */
  public async votes(
    chainID: string,
    proposalId: number,
    _params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<{
    votes: Vote[];
    pagination: Pagination;
  }> {
    return this.getReqFromChainID(chainID)
      .get<{ votes: Vote.Data[]; pagination: Pagination }>(
        `/cosmos/gov/v1beta1/proposals/${proposalId}/votes`,
        _params
      )
      .then(d => {
        return {
          votes: d.votes.map(v => Vote.fromData(v)),
          pagination: d.pagination,
        };
      });
  }

  /**
   * Get current votes for a proposal by voter address
   * @param proposalId proposal's ID
   * @param address address of the depositor
   */
  public async votesByAddress(
    proposalId: number,
    address: AccAddress
  ): Promise<{ vote: Vote }> {
    return this.getReqFromAddress(address)
      .get<{ vote: Vote.Data }>(
        `/cosmos/gov/v1beta1/proposals/${proposalId}/votes/${address}`
      )
      .then(d => {
        return {
          vote: Vote.fromData(d.vote),
        };
      });
  }
}
