import { BaseAPI } from './BaseAPI';
import { Proposal } from '../../../core/gov/v1/Proposal';

import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export class GovV1API extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
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
