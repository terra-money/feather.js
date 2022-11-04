import { BaseAPI } from './BaseAPI';
import { BlockInfo, DelegateValidator } from '../../../core';
import { APIParams, Pagination } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export class TendermintAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  /**
   * Gets the node's information.
   * @param chainID chain id
   */
  public async nodeInfo(
    chainID: string,
    params: APIParams = {}
  ): Promise<object> {
    return this.getReqFromChainID(chainID).getRaw(
      `/cosmos/base/tendermint/v1beta1/node_info`,
      params
    );
  }

  /**
   * Gets whether the node is currently in syncing mode to catch up with blocks.
   * @param chainID chain id
   */
  public async syncing(
    chainID: string,
    params: APIParams = {}
  ): Promise<boolean> {
    return this.getReqFromChainID(chainID)
      .getRaw<{ syncing: boolean }>(
        `/cosmos/base/tendermint/v1beta1/syncing`,
        params
      )
      .then(d => d.syncing);
  }

  /**
   * Gets the validator (delegates) set at the specific height. If no height is given, the current set is returned.
   * @param chainID chain id
   * @param height block height
   */
  public async validatorSet(
    chainID: string,
    height?: number,
    params: APIParams = {}
  ): Promise<[DelegateValidator[], Pagination]> {
    const url =
      height !== undefined
        ? `/cosmos/base/tendermint/v1beta1/validatorsets/${height}`
        : `/cosmos/base/tendermint/v1beta1/validatorsets/latest`;
    return this.getReqFromChainID(chainID)
      .get<{
        block_height: string;
        validators: DelegateValidator[];
        pagination: Pagination;
      }>(url, params)
      .then(d => [d.validators, d.pagination]);
  }

  /**
   * Gets the block information at the specified height. If no height is given, the latest block is returned.
   * @param chainID chain id
   * @param height block height.
   */
  public async blockInfo(
    chainID: string,
    height?: number,
    params: APIParams = {}
  ): Promise<BlockInfo> {
    const url =
      height !== undefined
        ? `/cosmos/base/tendermint/v1beta1/blocks/${height}`
        : `/cosmos/base/tendermint/v1beta1/blocks/latest`;
    return this.getReqFromChainID(chainID).getRaw<BlockInfo>(url, params);
  }
}
