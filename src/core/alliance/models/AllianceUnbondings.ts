import { ValAddress } from '../../../core/bech32';

export class AllianceUnbonding {
  constructor(
    public validatorAddr: ValAddress,
    public completionTime: Date,
    public amount: number,
    public denom: string
  ) {}

  public static fromData(
    data: AllianceUnbonding.Data,
    _?: boolean
  ): AllianceUnbonding {
    _;
    const { validator_addr, completion_time, amount, denom } = data;

    return new AllianceUnbonding(
      validator_addr,
      new Date(completion_time),
      parseInt(amount),
      denom
    );
  }

  public toData(_?: boolean): AllianceUnbonding.Data {
    _;
    const { validatorAddr, completionTime, amount, denom } = this;

    return {
      validator_addr: validatorAddr,
      completion_time: completionTime.toString(),
      amount: amount.toString(),
      denom: denom,
    };
  }
}

export namespace AllianceUnbonding {
  export interface Data {
    validator_addr: string;
    completion_time: string;
    amount: string;
    denom: string;
  }
}
