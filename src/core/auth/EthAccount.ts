import { PublicKey } from '../PublicKey';
import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';

/**
 * Stores information about an account fetched from the blockchain.
 */
export class EthAccount extends JSONSerializable<
  EthAccount.Amino,
  EthAccount.Data,
  {}
> {
  /**
   * Creates a new Account object, holding information about a basic account.
   *
   * @param address account address
   * @param public_key account's public key information
   * @param account_number account number on the blockchain
   * @param sequence sequence number, or number of transactions that have been posted
   */
  constructor(
    public address: AccAddress,
    public public_key: PublicKey | null,
    public account_number: number,
    public sequence: number
  ) {
    super();
  }

  public getAccountNumber(): number {
    return this.account_number;
  }

  public getSequenceNumber(): number {
    return this.sequence;
  }

  public getPublicKey(): PublicKey | null {
    return this.public_key;
  }

  public toAmino(_?: boolean): EthAccount.Amino {
    const { address, public_key, account_number, sequence } = this;
    return {
      type: 'injective/EthAccount',
      value: {
        address,
        public_key: public_key ? public_key.toAmino() : null,
        account_number: account_number.toFixed(),
        sequence: sequence.toFixed(),
      },
    };
  }

  public static fromAmino(data: EthAccount.Amino, _?: boolean): EthAccount {
    _;
    const {
      value: { address, public_key, account_number, sequence },
    } = data;

    return new EthAccount(
      address || '',
      public_key ? PublicKey.fromAmino(public_key) : null,
      Number.parseInt(account_number) || 0,
      Number.parseInt(sequence) || 0
    );
  }

  public static fromData(data: EthAccount.Data, _?: boolean): EthAccount {
    _;
    const { address, pub_key, account_number, sequence } = data.base_account;

    return new EthAccount(
      address || '',
      pub_key ? PublicKey.fromData(pub_key) : null,
      Number.parseInt(account_number) || 0,
      Number.parseInt(sequence) || 0
    );
  }

  public toData(_?: boolean): EthAccount.Data {
    _;
    const { address, public_key, account_number, sequence } = this;
    return {
      '@type': '/injective.types.v1beta1.EthAccount',
      base_account: {
        address,
        pub_key: public_key ? public_key.toData() : null,
        account_number: account_number.toFixed(),
        sequence: sequence.toFixed(),
      },
    };
  }

  public toProto(_?: boolean): {} {
    _;
    throw new Error('Protobuf not available for EthAccount');
  }
}

export namespace EthAccount {
  export interface AminoValue {
    address: AccAddress;
    public_key: PublicKey.Amino | null;
    account_number: string;
    sequence: string;
  }

  export interface Amino {
    type: 'injective/EthAccount';
    value: AminoValue;
  }

  export interface Data {
    '@type': '/injective.types.v1beta1.EthAccount';
    base_account: {
      address: AccAddress;
      pub_key: PublicKey.Data | null;
      account_number: string;
      sequence: string;
    };
  }
}
