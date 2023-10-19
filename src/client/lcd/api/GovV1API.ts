import { BaseAPI } from './BaseAPI';
import { Proposal } from '../../../core/gov/v1/Proposal';

import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import {
  DepositParams,
  VotingParams,
  TallyParams,
} from '@terra-money/terra.proto/cosmos/gov/v1/gov';

type GovV1APIParams = {
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
  ): Promise<GovV1APIParams> {
    const [res, res1, res2] = await Promise.all([
      this.depositParameters(chainID, params),
      this.votingParameters(chainID, params),
      this.tallyParameters(chainID, params),
    ]);
    return {
      deposit_params: res.deposit_params,
      voting_params: res1.voting_params,
      tally_params: res2.tally_params,
    };
  }

  /** Gets the Gov module's deposit parameters */
  public async depositParameters(
    chainID: string,
    params: APIParams = {}
  ): Promise<{ deposit_params: DepositParams }> {
    return this.getReqFromChainID(chainID).get<{
      deposit_params: DepositParams;
    }>(`/cosmos/gov/v1/params/deposit`, params);
  }

  /** Gets the Gov module's voting parameters */
  public async votingParameters(
    chainID: string,
    params: APIParams = {}
  ): Promise<{ voting_params: VotingParams }> {
    return this.getReqFromChainID(chainID).get<{ voting_params: VotingParams }>(
      `/cosmos/gov/v1/params/voting`,
      params
    );
  }

  /** Gets teh Gov module's tally parameters */
  public async tallyParameters(
    chainID: string,
    params: APIParams = {}
  ): Promise<{ tally_params: TallyParams }> {
    return this.getReqFromChainID(chainID).get<{ tally_params: TallyParams }>(
      `/cosmos/gov/v1/params/tallying`,
      params
    );
  }

  /**
   * Query all proposals using the gov v1 API.
   */
  public async proposals(
    chainID: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Proposal[], Pagination]> {
    return this.getReqFromChainID(chainID)
      .get<{ proposals: Proposal.Data[]; pagination: Pagination }>(
        `/cosmos/gov/v1/proposals`,
        params
      )
      .then(d => [
        d.proposals.map(prop => Proposal.fromData(prop)),
        d.pagination,
      ]);
  }
}
