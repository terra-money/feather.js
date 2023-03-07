import { JSONSerializable } from '../../../util/json';

/**
 * A delegator can submit this message to send more alliance assets
 * to be staked through the alliance module in a validator.
 */
export class MsgAminoCustom extends JSONSerializable<
  MsgAminoCustom.Amino,
  MsgAminoCustom.Data,
  {}
> {
  /**
   *
   * @param delegatorAddress delegator's account address
   * @param validatorAddress validator's operator address
   * @param amount amount of alliance assets to be sent for delegation
   */
  constructor(public aminoMsg: MsgAminoCustom.Amino) {
    super();
  }

  public toAmino(_?: boolean): MsgAminoCustom.Amino {
    _;
    return this.aminoMsg;
  }

  public static fromAmino(
    data: MsgAminoCustom.Amino,
    _?: boolean
  ): MsgAminoCustom {
    _;
    return new MsgAminoCustom(data);
  }

  public toProto(_?: boolean): {} {
    _;
    throw new Error('Protobuf not supported for MsgAminoCustom');
  }

  public packAny(_?: boolean): {} {
    _;
    throw new Error('Protobuf not supported for MsgAminoCustom');
  }

  public static unpackAny(msgAny: {}, _?: boolean): {} {
    msgAny;
    _;
    throw new Error('Protobuf not supported for MsgAminoCustom');
  }

  public static fromData(
    data: MsgAminoCustom.Data,
    _?: boolean
  ): MsgAminoCustom {
    _;
    const { msg } = data;
    return new MsgAminoCustom(msg);
  }

  public toData(_?: boolean): MsgAminoCustom.Data {
    _;
    return {
      '@type': 'MsgCustomAmino',
      msg: this.aminoMsg,
    };
  }
}

export namespace MsgAminoCustom {
  export interface Data {
    '@type': 'MsgCustomAmino';
    msg: MsgAminoCustom.Amino;
  }

  export interface Amino {
    type: string;
    value: Object;
  }
}
