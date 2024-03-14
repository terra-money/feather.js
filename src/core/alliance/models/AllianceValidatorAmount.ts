import { Dec } from '../../../core/numeric';

export class AllianceValidatorAmount {
  constructor(public denom: string, public amount: Dec) {}

  public static fromData(
    proto: AllianceValidatorAmount.Data,
    _?: boolean
  ): AllianceValidatorAmount {
    _;
    const { denom, amount } = proto;

    return new AllianceValidatorAmount(denom, new Dec(amount));
  }

  public toData(_?: boolean): AllianceValidatorAmount.Data {
    _;
    const { denom, amount } = this;

    return { denom, amount: amount.toString() };
  }
}

export namespace AllianceValidatorAmount {
  export interface Data {
    denom: string;
    amount: string;
  }
}
