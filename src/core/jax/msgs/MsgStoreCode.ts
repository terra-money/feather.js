import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgStoreCode as MsgStoreCode_pb } from '@terra-money/terra.proto/jax/tx';

export class MsgStoreCode extends JSONSerializable<
  MsgStoreCode.Amino,
  MsgStoreCode.Data,
  MsgStoreCode.Proto
> {
  public coins: Coins;
  /**
   * @param creator contract deployer
   * @param admin address of contract admin, usually contract deployer
   * @param code the JavaScript source code of the contract
   * @param params json stringified params to pass to init
   * @param coins coins to be sent to contract
   */
  constructor(
    public creator: AccAddress,
    public admin: AccAddress,
    public code: string,
    public params: string,
    coins: Coins.Input = {}
  ) {
    super();
    this.coins = new Coins(coins);
  }

  public static fromAmino(data: MsgStoreCode.Amino, _?: boolean): MsgStoreCode {
    const {
      value: { creator, admin, code, params },
    } = data as MsgStoreCode.AminoV2;
    return new MsgStoreCode(creator, admin, code, params);
  }

  public toAmino(_?: boolean): MsgStoreCode.Amino {
    const { creator, admin, code, params, coins } = this;
    return {
      type: 'jax/MsgStoreCode',
      value: {
        creator,
        admin,
        code,
        params,
        coins: coins.toAmino(),
      },
    };
  }

  public static fromProto(
    proto: MsgStoreCode.Proto,
    _?: boolean
  ): MsgStoreCode {
    const p = proto as MsgStoreCode_pb;
    return new MsgStoreCode(p.creator, p.admin, p.code, p.params);
  }

  public toProto(_?: boolean): MsgStoreCode.Proto {
    const { creator, admin, code, params, coins } = this;
    return MsgStoreCode_pb.fromPartial({
      creator,
      admin,
      code,
      params,
      coins: coins.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/jax.MsgStoreCode',
      value: MsgStoreCode_pb.encode(
        this.toProto(isClassic) as MsgStoreCode_pb
      ).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgStoreCode {
    return MsgStoreCode.fromProto(
      MsgStoreCode_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(data: MsgStoreCode.Data, _?: boolean): MsgStoreCode {
    const { creator, admin, code, params, coins } = data as MsgStoreCode.DataV2;
    return new MsgStoreCode(
      creator,
      admin,
      code,
      params,
      Coins.fromData(coins)
    );
  }

  public toData(_?: boolean): MsgStoreCode.Data {
    const { creator, admin, code, params, coins } = this;
    return {
      '@type': '/jax.MsgStoreCode',
      creator,
      admin,
      code,
      params,
      coins: coins.toData(),
    };
  }
}

export namespace MsgStoreCode {
  export interface AminoV1 {
    type: 'jax/MsgStoreCode';
    value: {
      creator: AccAddress;
      admin: AccAddress;
      code: string;
      params: string;
      coins: Coins.Amino;
    };
  }

  export interface AminoV2 {
    type: 'jax/MsgStoreCode';
    value: {
      creator: AccAddress;
      admin: AccAddress;
      code: string;
      params: string;
      coins: Coins.Amino;
    };
  }

  export interface DataV1 {
    '@type': '/jax.MsgStoreCode';
    creator: AccAddress;
    admin: AccAddress;
    code: string;
    params: string;
    coins: Coins.Data;
  }
  export interface DataV2 {
    '@type': '/jax.MsgStoreCode';
    creator: AccAddress;
    admin: AccAddress;
    code: string;
    params: string;
    coins: Coins.Data;
  }

  export type Amino = AminoV1 | AminoV2;
  export type Data = DataV1 | DataV2;
  export type Proto = MsgStoreCode_pb;
}
