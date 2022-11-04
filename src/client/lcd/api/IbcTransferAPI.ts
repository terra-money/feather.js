import { BaseAPI } from './BaseAPI';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
//import { DenomTrace } from '@terra-money/legacy.proto/ibc/applications/transfer/v1/query'
import { DenomTrace } from '../../../core/ibc/applications/transfer/v1/DenomTrace';
import { LCDClient } from '../LCDClient';

export interface IbcTransferParams {
  send_enabled: boolean;
  receive_enabled: boolean;
}

export namespace IbcTransferParams {
  export interface Data {
    send_enabled: boolean;
    receive_enabled: boolean;
  }
}

export class IbcTransferAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  /** Gets a denomTrace for the hash */
  public async denomTrace(hash: string, chainID: string): Promise<DenomTrace> {
    return this.getReqFromChainID(chainID)
      .get<{ denom_trace: DenomTrace.Data }>(
        `/ibc/apps/transfer/v1/denom_traces/${hash}`
      )
      .then(d => DenomTrace.fromData(d.denom_trace));
  }

  /** Gets a list of denomTraces */
  public async denomTraces(
    chainID: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[DenomTrace[], Pagination]> {
    return this.getReqFromChainID(chainID)
      .get<{ denom_traces: DenomTrace[]; pagination: Pagination }>(
        `/ibc/apps/transfer/v1/denom_traces`,
        params
      )
      .then(d => [d.denom_traces.map(DenomTrace.fromData), d.pagination]);
  }

  /** Gets a denomination hash information */
  public async denomHash(
    trace: string,
    chainID: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<string> {
    return await this.getReqFromChainID(chainID).get<string>(
      `/ibc/apps/transfer/v1/denom_hashes/${trace}`,
      params
    );
  }

  /**
   * Gets the current transfer application parameters.
   */
  public async parameters(
    chainID: string,
    params: APIParams = {}
  ): Promise<IbcTransferParams> {
    return this.getReqFromChainID(chainID)
      .get<{ params: IbcTransferParams.Data }>(
        `/ibc/apps/transfer/v1/params`,
        params
      )
      .then(({ params: d }) => ({
        send_enabled: d.send_enabled,
        receive_enabled: d.receive_enabled,
      }));
  }
}
