import { AccAddress, ValAddress } from '../../../core/bech32';
import { Coin } from '../../../core/Coin';

export class AllianceRedelegation {
  constructor(
    public delegatorAddress: AccAddress,
    public srcValidatorAddress: ValAddress,
    public dstValidatorAddress: ValAddress,
    public balance: Coin,
    public completionTime: Date
  ) {}

  public static fromData(
    data: AllianceRedelegation.Data,
    _?: boolean
  ): AllianceRedelegation {
    _;
    const {
      delegator_address,
      src_validator_address,
      dst_validator_address,
      balance,
      completion_time,
    } = data;

    return new AllianceRedelegation(
      delegator_address,
      src_validator_address,
      dst_validator_address,
      Coin.fromData(balance),
      new Date(completion_time)
    );
  }

  public toData(_?: boolean): AllianceRedelegation.Data {
    _;
    const {
      delegatorAddress,
      srcValidatorAddress,
      dstValidatorAddress,
      balance,
      completionTime,
    } = this;

    return {
      delegator_address: delegatorAddress,
      src_validator_address: srcValidatorAddress,
      dst_validator_address: dstValidatorAddress,
      balance: balance.toData(),
      completion_time: completionTime.toString(),
    };
  }
}

export namespace AllianceRedelegation {
  export interface Data {
    delegator_address: string;
    src_validator_address: string;
    dst_validator_address: string;
    balance: Coin.Data;
    completion_time: string;
  }
}
