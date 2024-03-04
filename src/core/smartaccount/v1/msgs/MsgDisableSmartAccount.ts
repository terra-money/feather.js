import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgDisableSmartAccount as MsgDisableSmartAccount_pb } from '@terra-money/terra.proto/terra/smartaccount/v1/tx';
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';

/**
 * MsgDisableSmartAccount disables a smart account
 */
export class MsgDisableSmartAccount extends JSONSerializable<
  MsgDisableSmartAccount.Amino,
  MsgDisableSmartAccount.Data,
  MsgDisableSmartAccount.Proto
> {
  /**
   *
   * @param account sender's account address
   */
  constructor(public account: AccAddress) {
    super();
  }

  public static fromAmino(
    data: MsgDisableSmartAccount.Amino
  ): MsgDisableSmartAccount {
    const {
      value: { account },
    } = data;
    return new MsgDisableSmartAccount(account);
  }

  public toAmino(): MsgDisableSmartAccount.Amino {
    const { account } = this;
    return {
      type: 'terra/MsgDisableSmartAccount',
      value: {
        account,
      },
    };
  }

  public static fromData(
    data: MsgDisableSmartAccount.Data
  ): MsgDisableSmartAccount {
    const { account } = data;
    return new MsgDisableSmartAccount(account);
  }

  public toData(): MsgDisableSmartAccount.Data {
    const { account } = this;
    return {
      '@type': '/terra.smartaccount.v1.MsgDisableSmartAccount',
      account,
    };
  }

  public static fromProto(
    proto: MsgDisableSmartAccount.Proto
  ): MsgDisableSmartAccount {
    return new MsgDisableSmartAccount(proto.account);
  }

  public toProto(): MsgDisableSmartAccount.Proto {
    const { account } = this;
    return MsgDisableSmartAccount_pb.fromPartial({
      account,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/terra.smartaccount.v1.MsgDisableSmartAccount',
      value: MsgDisableSmartAccount_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgDisableSmartAccount {
    return MsgDisableSmartAccount.fromProto(
      MsgDisableSmartAccount_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgDisableSmartAccount {
  export interface Amino {
    type: 'terra/MsgDisableSmartAccount';
    value: {
      account: AccAddress;
    };
  }

  export interface Data {
    '@type': '/terra.smartaccount.v1.MsgDisableSmartAccount';
    account: AccAddress;
  }

  export type Proto = MsgDisableSmartAccount_pb;
}
