import { Params as Params_pb } from '@terra-money/terra.proto/terra/smartaccount/v1/params';
import { JSONSerializable } from '../../../../util/json';

export class SmartaccountParams extends JSONSerializable<
  SmartaccountParams.Amino,
  SmartaccountParams.Data,
  SmartaccountParams.Proto
> {
  constructor() {
    super();
  }

  public static fromAmino(_: SmartaccountParams.Amino): SmartaccountParams {
    _;
    return new SmartaccountParams();
  }

  public toAmino(): SmartaccountParams.Amino {
    return {
      value: {},
    };
  }

  public static fromData(
    proto: SmartaccountParams.Data,
    _?: boolean
  ): SmartaccountParams {
    proto;
    _;
    return new SmartaccountParams();
  }

  public toData(_?: boolean): SmartaccountParams.Data {
    _;
    return {};
  }

  public static fromProto(proto: SmartaccountParams.Proto): SmartaccountParams {
    proto;
    return new SmartaccountParams();
  }

  public toProto(): SmartaccountParams.Proto {
    return Params_pb.fromPartial({});
  }
}

export namespace SmartaccountParams {
  export interface Amino {
    value: {};
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Data {}

  export type Proto = Params_pb;
}
