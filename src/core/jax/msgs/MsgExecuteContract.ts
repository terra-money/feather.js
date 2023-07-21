import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgExecuteContract as MsgExecuteContract_pb } from '@terra-money/terra.proto/jax/tx';

export class MsgExecuteContract extends JSONSerializable<
  MsgExecuteContract.Amino,
  MsgExecuteContract.Data,
  MsgExecuteContract.Proto
> {
  public coins: Coins;

  /**
   * @param sender contract user
   * @param contract contract address
   * @param method method name on the contract
   * @param params json stringified params
   * @param coins coins to be sent to contract
   */
  constructor(
    public sender: AccAddress,
    public contract: AccAddress,
    public method: string,
    public params: string,
    coins: Coins.Input = {}
  ) {
    super();
    this.coins = new Coins(coins);
  }

  public static fromAmino(
    data: MsgExecuteContract.Amino,
    _?: boolean
  ): MsgExecuteContract {
    const {
      value: { sender, contract, method, params, coins },
    } = data as MsgExecuteContract.AminoV2;
    return new MsgExecuteContract(
      sender,
      contract,
      method,
      params,
      Coins.fromAmino(coins)
    );
  }

  public toAmino(_?: boolean): MsgExecuteContract.Amino {
    const { sender, contract, method, params, coins } = this;
    return {
      type: 'jax/MsgExecuteContract',
      value: {
        sender,
        contract,
        method,
        params,
        funds: coins.toAmino(),
      },
    };
  }

  public static fromProto(
    proto: MsgExecuteContract.Proto,
    _?: boolean
  ): MsgExecuteContract {
    const p = proto as MsgExecuteContract_pb;
    return new MsgExecuteContract(
      p.sender,
      p.contract,
      p.method,
      p.params,
      Coins.fromProto(p.coins)
    );
  }

  public toProto(_?: boolean): MsgExecuteContract.Proto {
    const { sender, contract, method, params, coins } = this;
    return MsgExecuteContract_pb.fromPartial({
      coins: coins.toProto(),
      contract,
      sender,
      method,
      params,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/jax.MsgExecuteContract',
      value: MsgExecuteContract_pb.encode(
        this.toProto(isClassic) as MsgExecuteContract_pb
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgExecuteContract {
    return MsgExecuteContract.fromProto(
      MsgExecuteContract_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgExecuteContract.Data,
    _?: boolean
  ): MsgExecuteContract {
    const { sender, contract, method, params, coins } =
      data as MsgExecuteContract.DataV2;
    return new MsgExecuteContract(
      sender,
      contract,
      method,
      params,
      Coins.fromData(coins)
    );
  }

  public toData(_?: boolean): MsgExecuteContract.Data {
    const { sender, contract, method, params, coins } = this;
    return {
      '@type': '/jax.MsgExecuteContract',
      sender,
      contract,
      method,
      params,
      coins: coins.toData(),
    };
  }
}

export namespace MsgExecuteContract {
  export interface AminoV1 {
    type: 'jax/MsgExecuteContract';
    value: {
      sender: AccAddress;
      contract: AccAddress;
      method: string;
      params: string;
      funds: Coins.Amino;
    };
  }

  export interface AminoV2 {
    type: 'jax/MsgExecuteContract';
    value: {
      sender: AccAddress;
      contract: AccAddress;
      method: string;
      params: string;
      coins: Coins.Amino;
    };
  }

  export interface DataV1 {
    '@type': '/jax.MsgExecuteContract';
    sender: AccAddress;
    contract: AccAddress;
    method: string;
    params: string;
    coins: Coins.Amino;
  }
  export interface DataV2 {
    '@type': '/jax.MsgExecuteContract';
    sender: AccAddress;
    contract: AccAddress;
    method: string;
    params: string;
    coins: Coins.Amino;
  }

  export type Amino = AminoV1 | AminoV2;
  export type Data = DataV1 | DataV2;
  export type Proto = MsgExecuteContract_pb;
}
