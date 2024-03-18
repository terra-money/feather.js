import { BaseAPI } from './BaseAPI';
import {
  AllianceParams,
  AllianceAsset,
  AllianceDelegation,
  AllianceRedelegation,
  AllianceUnbonding,
  AllianceValidator,
} from '../../../core/alliance';
import { AccAddress, Coins, Coin, ValAddress } from '../../../core';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export class AllianceAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  /**
   * Query the alliance module params.
   *
   * @tags Query
   * @name params
   * @summary Query the alliance by denom
   * @request GET:/terra/alliances/params
   */
  public async params(
    chainId: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<AllianceParams> {
    const res = await this.getReqFromChainID(chainId).get<{
      params: AllianceParams.Data;
    }>(`/terra/alliances/params`, params);

    return AllianceParams.fromData(res.params);
  }

  /**
   * Query all available alliances with pagination.
   *
   * @tags Query
   * @name alliances
   * @summary Query paginated alliances
   * @request GET:/terra/alliances
   */
  public async queryAlliances(
    chainID: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<{ pagination: Pagination; alliances: AllianceAsset[] }> {
    const res = await this.getReqFromChainID(chainID).get<{
      pagination: Pagination;
      alliances: AllianceAsset.Data[];
    }>(`/terra/alliances`, params);

    return {
      pagination: res.pagination,
      alliances: res.alliances.map(a => AllianceAsset.fromData(a)),
    };
  }

  /**
   * Query the alliance by denom where denom will be encoded to URI component
   * where "/" will be replaced by "%2F" and will allow querying for alliance
   * assets with "/" or other special characters in their denom.
   *
   * @tags Query
   * @name queryAlliance
   * @summary Query the alliance by denom
   * @request GET:/terra/alliances/{denom}
   */
  public async queryAlliance(
    chainId: string,
    denom: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<AllianceAsset> {
    const encodedDenom = encodeURIComponent(encodeURIComponent(denom));
    const res = await this.getReqFromChainID(chainId).get<{
      alliance: AllianceAsset.Data;
    }>(`/terra/alliances/${encodedDenom}`, params);

    return AllianceAsset.fromData(res.alliance);
  }

  /**
   * Query all paginated alliance delegations with **OPTIONAL**  delAddr, valAddr and denom parameters
   * **BUT** dependent on each previous value. Which means that you cannot use this method to query
   * the validator's delegations without providing the delegator's address. The denom in the query will be
   * URL encoded to allow querying for alliance assets with "/" or other special characters in their denom.
   *
   * - When no values are provided, this query returns all delegations.
   * - When **delAddr** is provided, this query returns the delegations for the provided address.
   * - When **delAddr** and **valAddr** are provided, this query returns the delegations for the specified address and validator.
   * - When **delAddr**, **valAddr** and **denom** are provided, this query returns the delegations for the specified address, validator and denom.
   * ¡WARNING!: for efficiency reasons, provide all specified parameters, otherwise the query will be slower.
   * @tags Query
   * @name queryAllianceDelegations
   * @summary Query all paginated alliance delegations
   * @request GET:/terra/alliances/delegations or
   *          GET:/terra/alliances/delegations/{delAddr} or
   *          GET:/terra/alliances/delegations/{delAddr}/{valAddr} or
   *          GET:/terra/alliances/delegations/{delAddr}/{valAddr}/{denom}
   */
  public async queryAllianceDelegations(
    chainID: string,
    delAddr?: AccAddress,
    valAddr?: ValAddress,
    denom?: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<{
    delegations: AllianceDelegation[];
    pagination: Pagination;
  }> {
    let url = `/terra/alliances/delegations`;
    if (delAddr) {
      url += `/${delAddr}`;
    }
    if (valAddr) {
      if (!delAddr) {
        throw new Error(
          'A DELEGATOR ADDRESS must be provided if a VALIDATOR ADDRESS is provided!!'
        );
      }

      url += `/${valAddr}`;
    }
    if (denom) {
      if (!valAddr) {
        throw new Error(
          'A VALIDATOR ADDRESS must be provided if an ALLIANCE DENOM is provided!!'
        );
      }
      url += `/${encodeURIComponent(encodeURIComponent(denom))}`;
    }

    // If all parameters are provided, the response will be a single delegation.
    // In order to fit the return type, an array of delegations is returned.
    if (delAddr && valAddr && denom) {
      const res = await this.getReqFromChainID(chainID).get<{
        delegation: AllianceDelegation.Data;
      }>(url, params);

      return {
        pagination: {
          next_key: null,
          total: 1,
        },
        delegations: [AllianceDelegation.fromData(res.delegation)],
      };
    } else {
      const res = await this.getReqFromChainID(chainID).get<{
        delegations: AllianceDelegation.Data[];
        balance: Coin.Data;
        pagination: Pagination;
      }>(url, params);

      return {
        pagination: res.pagination,
        delegations: res.delegations.map(d => AllianceDelegation.fromData(d)),
      };
    }
  }

  /**
   * Query paginated redelegations by delAddr. Optionally, you can also provide
   * the denom parameter which will improve the query response time. The denom in
   * the query will be URL encoded to allow querying for alliance assets with "/"
   * or other special characters in their denom.
   *
   * @tags Query
   * @name queryAllianceRedelegations
   * @summary Query for redelegations by delegator addr and denom
   * @request GET:/terra/alliances/redelegations/{delAddr} or
   *          GET:/terra/alliances/redelegations/{denom}/{delAddr}
   */
  public async queryAllianceRedelegations(
    delAddr: string,
    denom: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    const url = denom
      ? `/terra/alliances/redelegations/${encodeURIComponent(
          encodeURIComponent(denom)
        )}/${delAddr}`
      : `/terra/alliances/redelegations/${delAddr}`;

    const res = await this.getReqFromAddress(delAddr).get<{
      redelegations: AllianceRedelegation.Data[];
      pagination: Pagination;
    }>(url, params);

    return {
      redelegations: res.redelegations.map(r =>
        AllianceRedelegation.fromData(r)
      ),
      pagination: res.pagination,
    };
  }

  /**
   * Query paginated rewards by delAddr, valAddr and alliance denom. The denom in
   * the query will be URL encoded to allow querying for alliance assets with "/"
   * or other special characters in their denom.
   *
   * @tags Query
   * @name queryAllianceRewards
   * @summary Query alliance rewards by delegator addr, validator_addr and denom
   * @request GET:/terra/alliances/rewards/{delAddr}/{valAddr}/{denom}
   */
  public async queryAllianceRewards(
    delAddr: string,
    valAddr: string,
    denom: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    const url = `/terra/alliances/rewards/${encodeURIComponent(
      encodeURIComponent(denom)
    )}/${valAddr}/${delAddr}`;

    const res = await this.getReqFromAddress(delAddr).get<{
      rewards: Coins.Data;
    }>(url, params);

    return Coins.fromData(res.rewards);
  }

  /**
   * Query alliances unbondings by delAddr where denom and valAddr are optional parameters,
   * that valAddr depend on the denom. When all values are provided the query will be faster,
   * Any denom specified in this query will be URL encoded to allow querying for alliance assets
   * with "/" or other special characters in their denom.
   *
   * - When **delAddr** is provided, this query returns the unbondings for the provided address.
   * - When **denom** and **delAddr** are provided, this query returns the unbondings for the
   * specified address and denom.
   * - When **delAddr**, **valAddr** and **denom** are provided, this query returns the unbondings
   *  for the specified address, validator and denom.
   *
   * @tags Query
   * @name queryAllianceUnbondings
   * @summary Query alliance unbondings by delegator addr, validator_addr and denom
   * @request GET:/terra/alliances/unbondings/{delAddr}
   *          GET:/terra/alliances/unbondings/{denom}/{delAddr}
   *          GET:/terra/alliances/unbondings/{denom}/{delAddr}/{valAddr}
   */
  public async queryAllianceUnbondings(
    delAddr: string,
    denom?: string,
    valAddr?: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    let url = '/terra/alliances/unbondings';

    // Since the url is different when denom is provided, the url will be built
    // based on the parameters provided
    if (denom && valAddr) {
      url += `/${encodeURIComponent(
        encodeURIComponent(denom)
      )}/${delAddr}/${valAddr}`;
    } else if (denom) {
      url += `/${encodeURIComponent(encodeURIComponent(denom))}/${delAddr}`;
    } else {
      url += `/${delAddr}`;
    }

    const res = await this.getReqFromAddress(delAddr).get<{
      unbondings: AllianceUnbonding.Data[];
    }>(url, params);

    return res.unbondings.map(e => AllianceUnbonding.fromData(e));
  }

  /**
   * Query all validators that have at least one user delegation. You can optionally provide valAddr
   * to query a single validator. Providing the validatorAddr will deliver a faster response.
   * This query returns data about the delegations shares, validator shares,
   *  and total staked tokens.
   *
   * @tags Query
   * @name queryAllianceValidators
   * @summary Query all paginated alliance validators
   * @request GET:/terra/alliances/validators or
   *        GET:/terra/alliances/validators/{valAddr}
   */
  public async queryAllianceValidators(
    chainID: string,
    valAddr?: ValAddress,
    params: Partial<PaginationOptions & APIParams> = {}
  ) {
    if (valAddr) {
      const res = await this.getReqFromChainID(
        chainID
      ).get<AllianceValidator.Data>(`/terra/alliances/validators/${valAddr}`);

      return {
        validators: [AllianceValidator.fromData(res)],
        pagination: {
          next_key: null,
          total: 1,
        },
      };
    } else {
      const res = await this.getReqFromChainID(chainID).get<{
        validators: AllianceValidator.Data[];
        pagination: Pagination;
      }>(`/terra/alliances/validators`, params);

      return {
        validators: res.validators.map(v => AllianceValidator.fromData(v)),
        pagination: res.pagination,
      };
    }
  }
}
