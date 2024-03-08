import { ValAddress } from 'core/bech32';
import { Coin } from '../../../core/Coin';
import { AllianceValidatorAmount } from './AllianceValidatorAmount';

export class AllianceValidator {
  constructor(
    public validatorAddr: ValAddress,
    public totalDelegationShares: Array<AllianceValidatorAmount>,
    public validatorShares: Array<AllianceValidatorAmount>,
    public totalStaked: Array<AllianceValidatorAmount>
  ) {}

  public static fromData(
    data: AllianceValidator.Data,
    _?: boolean
  ): AllianceValidator {
    _;
    const {
      validator_addr,
      total_delegation_shares,
      validator_shares,
      total_staked,
    } = data;

    return new AllianceValidator(
      validator_addr,
      total_delegation_shares.map(a => AllianceValidatorAmount.fromData(a)),
      validator_shares.map(a => AllianceValidatorAmount.fromData(a)),
      total_staked.map(a => AllianceValidatorAmount.fromData(a))
    );
  }

  public toData(_?: boolean): AllianceValidator.Data {
    _;
    const {
      validatorAddr,
      totalDelegationShares,
      validatorShares,
      totalStaked,
    } = this;

    return {
      validator_addr: validatorAddr,
      total_delegation_shares: totalDelegationShares.map(a => a.toData()),
      validator_shares: validatorShares.map(a => a.toData()),
      total_staked: totalStaked.map(a => a.toData()),
    };
  }
}

export namespace AllianceValidator {
  export interface Data {
    validator_addr: string;
    total_delegation_shares: Array<AllianceValidatorAmount.Data>;
    validator_shares: Array<AllianceValidatorAmount.Data>;
    total_staked: Array<AllianceValidatorAmount.Data>;
  }
}
