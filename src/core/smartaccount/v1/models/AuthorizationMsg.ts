import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { AuthorizationMsg as AuthorizationMsg_pb } from '@terra-money/terra.proto/terra/smartaccount/v1/setting';
import { JSONSerializable } from '../../../../util/json';

/**
 * AuthorizationMsg holds the contract address and initial message
 * to be passed to the contract for custom authorization
 */
export class AuthorizationMsg extends JSONSerializable<
  AuthorizationMsg.Amino,
  AuthorizationMsg.Data,
  AuthorizationMsg.Proto
> {
  /**
   *
   * @param contractAddress contract address of authorization logic
   * @param initMsg initial message to be passed to the contract
   */
  constructor(public contractAddress: string, public initMsg: string) {
    super();
  }

  public static fromAmino(data: AuthorizationMsg.Amino): AuthorizationMsg {
    const {
      value: { contractAddress, initMsg },
    } = data;
    return new AuthorizationMsg(contractAddress, initMsg);
  }

  public toAmino(): AuthorizationMsg.Amino {
    const { contractAddress, initMsg } = this;
    return {
      value: {
        contractAddress,
        initMsg,
      },
    };
  }

  public static fromData(data: AuthorizationMsg.Data): AuthorizationMsg {
    const { contractAddress, initMsg } = data;
    return new AuthorizationMsg(contractAddress, initMsg);
  }

  public toData(): AuthorizationMsg.Data {
    const { contractAddress, initMsg } = this;
    return {
      contractAddress,
      initMsg,
    };
  }

  public static fromProto(proto: AuthorizationMsg.Proto): AuthorizationMsg {
    return new AuthorizationMsg(proto.contractAddress, proto.initMsg);
  }

  public toProto(): AuthorizationMsg.Proto {
    const { contractAddress, initMsg } = this;
    return AuthorizationMsg_pb.fromPartial({
      contractAddress,
      initMsg,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      value: AuthorizationMsg_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): AuthorizationMsg {
    return AuthorizationMsg.fromProto(AuthorizationMsg_pb.decode(msgAny.value));
  }
}

export namespace AuthorizationMsg {
  export interface Amino {
    value: {
      contractAddress: string;
      initMsg: string;
    };
  }

  export interface Data {
    contractAddress: string;
    initMsg: string;
  }

  export type Proto = AuthorizationMsg_pb;
}
