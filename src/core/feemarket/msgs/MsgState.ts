import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { MsgState as MsgState_pb } from '@terra-money/terra.proto/feemarket/feemarket/v1/tx';
import { State } from '../state';
import { State as State_pb } from '@terra-money/terra.proto/feemarket/feemarket/v1/genesis';

export class MsgState extends JSONSerializable<
  MsgState.Amino,
  MsgState.Data,
  MsgState.Proto
> {
  constructor(public state: State, public authority: AccAddress) {
    super();
  }

  public static fromAmino(data: MsgState.Amino): MsgState {
    const {
      value: { state, authority },
    } = data;
    return new MsgState(State.fromAmino(state), authority);
  }

  public toAmino(): MsgState.Amino {
    const { state, authority } = this;
    return {
      type: 'feemarket/MsgState',
      value: {
        state: state.toAmino(),
        authority: authority,
      },
    };
  }

  public static fromData(proto: MsgState.Data): MsgState {
    const { state, authority } = proto;
    return new MsgState(State.fromData(state), authority);
  }

  public toData(): MsgState.Data {
    const { state, authority } = this;
    return {
      '@type': '/feemarket.feemarket.v1.MsgState',
      state: state.toData(),
      authority: authority,
    };
  }

  public static fromProto(proto: MsgState.Proto): MsgState {
    return new MsgState(
      State.fromProto(proto.state as State_pb),
      proto.authority
    );
  }

  public toProto(): MsgState.Proto {
    const { state, authority } = this;
    return MsgState_pb.fromPartial({
      state: state.toProto(),
      authority,
    });
  }
}

export namespace MsgState {
  export interface Amino {
    type: 'feemarket/MsgState';
    value: {
      state: State.Amino;
      authority: AccAddress;
    };
  }

  export interface Data {
    '@type': '/feemarket.feemarket.v1.MsgState';
    state: State.Data;
    authority: AccAddress;
  }
  export type Proto = MsgState_pb;
}
