import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUpdateTransactionHooks as MsgUpdateTransactionHooks_pb } from '@terra-money/terra.proto/terra/smartaccount/v1/tx';
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';

/**
 * MsgUpdateTransactionHooks adds permission for Grantee to spend up to Allowance
 * of fees from the account of Granter.
 */
export class MsgUpdateTransactionHooks extends JSONSerializable<
  MsgUpdateTransactionHooks.Amino,
  MsgUpdateTransactionHooks.Data,
  MsgUpdateTransactionHooks.Proto
> {
  /**
   *
   * @param account sender's account address
   */
  constructor(
    public account: AccAddress,
    public preTransactionHooks: string[],
    public postTransactionHooks: string[]
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateTransactionHooks.Amino
  ): MsgUpdateTransactionHooks {
    const {
      value: { account, preTransactionHooks, postTransactionHooks },
    } = data;
    return new MsgUpdateTransactionHooks(
      account,
      preTransactionHooks,
      postTransactionHooks
    );
  }

  public toAmino(): MsgUpdateTransactionHooks.Amino {
    const { account, preTransactionHooks, postTransactionHooks } = this;
    return {
      type: 'terra/MsgUpdateTransactionHooks',
      value: {
        account,
        preTransactionHooks,
        postTransactionHooks,
      },
    };
  }

  public static fromData(
    data: MsgUpdateTransactionHooks.Data
  ): MsgUpdateTransactionHooks {
    const { account, preTransactionHooks, postTransactionHooks } = data;
    return new MsgUpdateTransactionHooks(
      account,
      preTransactionHooks,
      postTransactionHooks
    );
  }

  public toData(): MsgUpdateTransactionHooks.Data {
    const { account, preTransactionHooks, postTransactionHooks } = this;
    return {
      '@type': '/terra.smartaccount.v1.MsgUpdateTransactionHooks',
      account,
      preTransactionHooks,
      postTransactionHooks,
    };
  }

  public static fromProto(
    proto: MsgUpdateTransactionHooks.Proto
  ): MsgUpdateTransactionHooks {
    return new MsgUpdateTransactionHooks(
      proto.account,
      proto.preTransactionHooks,
      proto.postTransactionHooks
    );
  }

  public toProto(): MsgUpdateTransactionHooks.Proto {
    const { account, preTransactionHooks, postTransactionHooks } = this;
    return MsgUpdateTransactionHooks_pb.fromPartial({
      account,
      preTransactionHooks,
      postTransactionHooks,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/terra.smartaccount.v1.MsgUpdateTransactionHooks',
      value: MsgUpdateTransactionHooks_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgUpdateTransactionHooks {
    return MsgUpdateTransactionHooks.fromProto(
      MsgUpdateTransactionHooks_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgUpdateTransactionHooks {
  export interface Amino {
    type: 'terra/MsgUpdateTransactionHooks';
    value: {
      account: AccAddress;
      preTransactionHooks: string[];
      postTransactionHooks: string[];
    };
  }

  export interface Data {
    '@type': '/terra.smartaccount.v1.MsgUpdateTransactionHooks';
    account: AccAddress;
    preTransactionHooks: string[];
    postTransactionHooks: string[];
  }

  export type Proto = MsgUpdateTransactionHooks_pb;
}
