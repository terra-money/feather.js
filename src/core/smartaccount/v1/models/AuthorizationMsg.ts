import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { AuthorizationMsg as AuthorizationMsg_pb } from '@terra-money/terra.proto/terra/smartaccount/v1/setting';
import { JSONSerializable } from '../../../../util/json';
import { Initialization } from './Initialization';

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
  constructor(public contractAddress: string, public initMsg: Initialization) {
    super();
  }

  public static fromAmino(data: AuthorizationMsg.Amino): AuthorizationMsg {
    const {
      value: { contractAddress, initMsg },
    } = data;
    return new AuthorizationMsg(
      contractAddress,
      Initialization.fromAmino(initMsg)
    );
  }

  public toAmino(): AuthorizationMsg.Amino {
    const { contractAddress, initMsg } = this;
    return {
      value: {
        contractAddress,
        initMsg: initMsg.toAmino(),
      },
    };
  }

  public static fromData(data: AuthorizationMsg.Data): AuthorizationMsg {
    const { contract_address, init_msg } = data;
    return new AuthorizationMsg(
      contract_address,
      Initialization.fromData(init_msg)
    );
  }

  public toData(): AuthorizationMsg.Data {
    const { contractAddress, initMsg } = this;
    return {
      contract_address: contractAddress,
      init_msg: initMsg.toData(),
    };
  }

  public static fromProto(proto: AuthorizationMsg.Proto): AuthorizationMsg {
    return new AuthorizationMsg(
      proto.contractAddress,
      proto.initMsg as Initialization
    );
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
      initMsg: Initialization.Amino;
    };
  }

  export interface Data {
    contract_address: string;
    init_msg: Initialization.Data;
  }

  export type Proto = AuthorizationMsg_pb;
}
