import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgCreateSmartAccount as MsgCreateSmartAccount_pb } from '@terra-money/terra.proto/terra/smartaccount/v1/tx';
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';

/**
 * MsgCreateSmartAccount creates a new smart account
 */
export class MsgCreateSmartAccount extends JSONSerializable<
  MsgCreateSmartAccount.Amino,
  MsgCreateSmartAccount.Data,
  MsgCreateSmartAccount.Proto
> {
  /**
   *
   * @param account sender's account address
   */
  constructor(public account: AccAddress) {
    super();
  }

  public static fromAmino(
    data: MsgCreateSmartAccount.Amino
  ): MsgCreateSmartAccount {
    const {
      value: { account },
    } = data;
    return new MsgCreateSmartAccount(account);
  }

  public toAmino(): MsgCreateSmartAccount.Amino {
    const { account } = this;
    return {
      type: 'terra/MsgCreateSmartAccount',
      value: {
        account,
      },
    };
  }

  public static fromData(
    data: MsgCreateSmartAccount.Data
  ): MsgCreateSmartAccount {
    const { account } = data;
    return new MsgCreateSmartAccount(account);
  }

  public toData(): MsgCreateSmartAccount.Data {
    const { account } = this;
    return {
      '@type': '/terra.smartaccount.v1.MsgCreateSmartAccount',
      account,
    };
  }

  public static fromProto(
    proto: MsgCreateSmartAccount.Proto
  ): MsgCreateSmartAccount {
    return new MsgCreateSmartAccount(proto.account);
  }

  public toProto(): MsgCreateSmartAccount.Proto {
    const { account } = this;
    return MsgCreateSmartAccount_pb.fromPartial({
      account,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/terra.smartaccount.v1.MsgCreateSmartAccount',
      value: MsgCreateSmartAccount_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgCreateSmartAccount {
    return MsgCreateSmartAccount.fromProto(
      MsgCreateSmartAccount_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgCreateSmartAccount {
  export interface Amino {
    type: 'terra/MsgCreateSmartAccount';
    value: {
      account: AccAddress;
    };
  }

  export interface Data {
    '@type': '/terra.smartaccount.v1.MsgCreateSmartAccount';
    account: AccAddress;
  }

  export type Proto = MsgCreateSmartAccount_pb;
}
