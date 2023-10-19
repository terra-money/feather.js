import { Coins } from '../../../Coins';
import { Proposal } from '../Proposal';
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgSubmitProposal as MsgSubmitProposal_pb } from '@terra-money/terra.proto/cosmos/gov/v1/tx';

/**
 * Submit a proposal alongside an initial deposit.
 */
export class MsgSubmitProposal extends JSONSerializable<
  MsgSubmitProposal.Amino,
  MsgSubmitProposal.Data,
  MsgSubmitProposal.Proto
> {
  public initial_deposit: Coins;

  /**
   * @param messages proposal message to submit
   * @param initial_deposit deposit provided
   * @param proposer proposer's account address
   */
  constructor(
    public messages: Proposal.Message[],
    initial_deposit: Coins.Input,
    public proposer: AccAddress
  ) {
    super();
    this.initial_deposit = new Coins(initial_deposit);
  }

  public static fromAmino(
    data: MsgSubmitProposal.Amino,
    _?: boolean
  ): MsgSubmitProposal {
    const {
      value: { messages, initial_deposit, proposer },
    } = data;
    return new MsgSubmitProposal(
      messages.map((msg: any) => Proposal.Message.fromAmino(msg, _)),
      Coins.fromAmino(initial_deposit),
      proposer
    );
  }

  public toAmino(_?: boolean): MsgSubmitProposal.Amino {
    const { messages, initial_deposit, proposer } = this;
    return {
      type: 'cosmos-sdk/v1/MsgSubmitProposal',
      value: {
        messages: messages.map(msg => msg.toAmino(_)),
        initial_deposit: initial_deposit.toAmino(),
        proposer,
      },
    };
  }

  public static fromData(
    data: MsgSubmitProposal.Data,
    _?: boolean
  ): MsgSubmitProposal {
    const { messages, initial_deposit, proposer } = data;
    return new MsgSubmitProposal(
      messages.map((msg: any) => Proposal.Message.fromData(msg, _)),
      Coins.fromData(initial_deposit),
      proposer
    );
  }

  public toData(_?: boolean): MsgSubmitProposal.Data {
    const { messages, initial_deposit, proposer } = this;
    return {
      '@type': '/cosmos.gov.v1.MsgSubmitProposal',
      messages: messages.map(msg => msg.toData(_)),
      initial_deposit: initial_deposit.toData(),
      proposer,
    };
  }

  public static fromProto(
    proto: MsgSubmitProposal.Proto,
    _?: boolean
  ): MsgSubmitProposal {
    const _msgs = new Array<Proposal.Message>();
    for (const msg of proto.messages) {
      const _msg = Proposal.Message.fromProto(msg as any, _);
      if (_msg !== undefined) {
        _msgs.push(_msg);
      } else {
        console.warn('[GOV V1] IMPLEMENT THE PROTO INTERFACE FOR', _msg);
      }
    }
    return new MsgSubmitProposal(
      _msgs,
      Coins.fromProto(proto.initialDeposit),
      proto.proposer
    );
  }

  public toProto(_?: boolean): MsgSubmitProposal.Proto {
    const { messages, initial_deposit, proposer } = this;
    return MsgSubmitProposal_pb.fromPartial({
      messages: messages.map(msg => msg.packAny(_)),
      initialDeposit: initial_deposit.toProto(),
      proposer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1.MsgSubmitProposal',
      value: MsgSubmitProposal_pb.encode(this.toProto(_)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgSubmitProposal {
    return MsgSubmitProposal.fromProto(
      MsgSubmitProposal_pb.decode(msgAny.value),
      _
    );
  }
}

export namespace MsgSubmitProposal {
  export interface Amino {
    type: 'cosmos-sdk/v1/MsgSubmitProposal';
    value: {
      messages: Proposal.Message.Amino;
      initial_deposit: Coins.Amino;
      proposer: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1.MsgSubmitProposal';
    messages: Proposal.Message.Data;
    initial_deposit: Coins.Data;
    proposer: AccAddress;
  }

  export type Proto = MsgSubmitProposal_pb;
}
