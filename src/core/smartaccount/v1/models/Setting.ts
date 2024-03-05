import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Setting as Setting_pb } from '@terra-money/terra.proto/terra/smartaccount/v1/setting';
import { JSONSerializable } from '../../../../util/json';
import { AuthorizationMsg } from './AuthorizationMsg';

/**
 * Setting holds the contract address and initial message
 * to be passed to the contract for custom authorization
 */
export class Setting extends JSONSerializable<
  Setting.Amino,
  Setting.Data,
  Setting.Proto
> {
  /**
   *
   * @param contractAddress contract address of authorization logic
   * @param initMsg initial message to be passed to the contract
   */
  constructor(
    public owner: string,
    public authorization: AuthorizationMsg[],
    public preTransaction: string[],
    public postTransaction: string[],
    public fallback: boolean
  ) {
    super();
  }

  public static fromAmino(data: Setting.Amino): Setting {
    const {
      value: {
        owner,
        authorization,
        preTransaction,
        postTransaction,
        fallback,
      },
    } = data;
    return new Setting(
      owner,
      authorization,
      preTransaction,
      postTransaction,
      fallback
    );
  }

  public toAmino(): Setting.Amino {
    const { owner, authorization, preTransaction, postTransaction, fallback } =
      this;
    return {
      value: {
        owner,
        authorization,
        preTransaction,
        postTransaction,
        fallback,
      },
    };
  }

  public static fromData(data: Setting.Data): Setting {
    const {
      owner,
      authorization,
      pre_transaction,
      post_transaction,
      fallback,
    } = data;
    return new Setting(
      owner,
      authorization,
      pre_transaction,
      post_transaction,
      fallback
    );
  }

  public toData(): Setting.Data {
    const { owner, authorization, preTransaction, postTransaction, fallback } =
      this;
    return {
      owner,
      authorization,
      pre_transaction: preTransaction,
      post_transaction: postTransaction,
      fallback,
    };
  }

  public static fromProto(proto: Setting.Proto): Setting {
    return new Setting(
      proto.owner,
      proto.authorization.map(AuthorizationMsg.fromProto),
      proto.preTransaction,
      proto.postTransaction,
      proto.fallback
    );
  }

  public toProto(): Setting.Proto {
    const { owner, authorization, preTransaction, postTransaction, fallback } =
      this;
    return Setting_pb.fromPartial({
      owner,
      authorization,
      preTransaction,
      postTransaction,
      fallback,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      value: Setting_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): Setting {
    return Setting.fromProto(Setting_pb.decode(msgAny.value));
  }
}

export namespace Setting {
  export interface Amino {
    value: {
      owner: string;
      authorization: AuthorizationMsg[];
      preTransaction: string[];
      postTransaction: string[];
      fallback: boolean;
    };
  }

  export interface Data {
    owner: string;
    authorization: AuthorizationMsg[];
    pre_transaction: string[];
    post_transaction: string[];
    fallback: boolean;
  }

  export type Proto = Setting_pb;
}
