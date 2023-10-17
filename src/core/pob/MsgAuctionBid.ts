import { JSONSerializable } from '../../util/json';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import { MsgAuctionBid as MsgAuctionBid_pb } from '@terra-money/terra.proto/pob/builder/v1/tx';
import { AccAddress } from '../bech32';
import { Coin } from '../Coin';

/**
 * MsgAuctionBid create a new acution bid to include in the next block
 * with signed transactions.
 */
export class MsgAuctionBid extends JSONSerializable<
  MsgAuctionBid.Amino,
  MsgAuctionBid.Data,
  MsgAuctionBid.Proto
> {
  /**
   * @param bidder bidder's address
   * @param transactions signed transactions to include in the next block
   * @param bid amount of coin that will be used to bid for the auction
   */
  constructor(
    public bidder: string,
    public transactions: Uint8Array[],
    public bid?: Coin
  ) {
    super();
  }

  public static fromAmino(
    data: MsgAuctionBid.Amino,
    _?: boolean
  ): MsgAuctionBid {
    _;
    const {
      value: { bidder, transactions, bid },
    } = data;
    return new MsgAuctionBid(
      bidder,
      transactions,
      bid ? Coin.fromAmino(bid) : undefined
    );
  }

  public toAmino(_?: boolean): MsgAuctionBid.Amino {
    _;
    const { bidder, transactions, bid } = this;
    return {
      type: 'pob/MsgAuctionBid',
      value: {
        bidder,
        transactions,
        bid: bid?.toAmino(),
      },
    };
  }

  public static fromData(data: MsgAuctionBid.Data, _?: boolean): MsgAuctionBid {
    _;
    const { bidder, transactions, bid } = data;
    return new MsgAuctionBid(
      bidder,
      transactions,
      bid ? Coin.fromData(bid) : undefined
    );
  }

  public toData(_?: boolean): MsgAuctionBid.Data {
    _;
    const { bidder, transactions, bid } = this;
    return {
      '@type': '/pob.builder.v1.MsgAuctionBid',
      bidder,
      transactions,
      bid: bid?.toData(),
    };
  }

  public static fromProto(
    proto: MsgAuctionBid.Proto,
    _?: boolean
  ): MsgAuctionBid {
    _;
    return new MsgAuctionBid(
      proto.bidder,
      proto.transactions,
      proto.bid ? Coin.fromProto(proto?.bid) : undefined
    );
  }

  public toProto(_?: boolean): MsgAuctionBid.Proto {
    _;
    const { bidder, transactions, bid } = this;
    return MsgAuctionBid_pb.fromPartial({
      bidder,
      transactions,
      bid: bid?.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/pob.builder.v1.MsgAuctionBid',
      value: MsgAuctionBid_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgAuctionBid {
    return MsgAuctionBid.fromProto(
      MsgAuctionBid_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgAuctionBid {
  export interface Amino {
    type: 'pob/MsgAuctionBid';
    value: {
      bidder: AccAddress;
      transactions: Uint8Array[];
      bid?: Coin.Amino;
    };
  }

  export interface Data {
    '@type': '/pob.builder.v1.MsgAuctionBid';
    bidder: AccAddress;
    transactions: Uint8Array[];
    bid?: Coin.Data;
  }

  export type Proto = MsgAuctionBid_pb;
}
