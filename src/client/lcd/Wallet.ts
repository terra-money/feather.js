import { LCDClient } from './LCDClient';
import { Key } from '../../key';
import { CreateTxOptions } from '../lcd/api/TxAPI';
import { Tx } from '../../core/Tx';
import { SignMode as SignModeV1 } from '@terra-money/legacy.proto/cosmos/tx/signing/v1beta1/signing';
import { SignMode as SignModeV2 } from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';
import { MsgAminoCustom } from '../../core';

export class Wallet {
  constructor(public lcd: LCDClient, public key: Key) {}

  public accountNumberAndSequence(chainID: string): Promise<{
    account_number: number;
    sequence: number;
  }> {
    return this.lcd.auth
      .accountInfo(this.key.accAddress(this.lcd.config[chainID].prefix))
      .then(d => {
        return {
          account_number: d.getAccountNumber(),
          sequence: d.getSequenceNumber(),
        };
      });
  }

  public accountNumber(chainID: string): Promise<number> {
    return this.lcd.auth
      .accountInfo(this.key.accAddress(this.lcd.config[chainID].prefix))
      .then(d => {
        return d.getAccountNumber();
      });
  }

  public sequence(chainID: string): Promise<number> {
    return this.lcd.auth
      .accountInfo(this.key.accAddress(this.lcd.config[chainID].prefix))
      .then(d => {
        return d.getSequenceNumber();
      });
  }

  public async createTx(
    options: CreateTxOptions & {
      sequence?: number;
    }
  ): Promise<Tx> {
    return this.lcd.tx.create(
      [
        {
          address: this.key.accAddress(this.lcd.config[options.chainID].prefix),
          sequenceNumber: options.sequence,
          publicKey: this.key.publicKey,
        },
      ],
      options
    );
  }

  public async createAndSignTx(
    options: CreateTxOptions & {
      sequence?: number;
      accountNumber?: number;
      signMode?: SignModeV1 | SignModeV2;
      chainID: string;
    }
  ): Promise<Tx> {
    let accountNumber = options.accountNumber;
    let sequence = options.sequence;

    if (accountNumber === undefined || sequence === undefined) {
      const res = await this.accountNumberAndSequence(options.chainID);
      if (accountNumber === undefined) {
        accountNumber = res.account_number;
      }

      if (sequence === undefined) {
        sequence = res.sequence;
      }
    }

    options.sequence = sequence;
    options.accountNumber = accountNumber;

    const tx = await this.createTx(options);
    return this.key.signTx(
      tx,
      {
        accountNumber,
        sequence,
        chainID: options.chainID,
        signMode:
          options.signMode ||
          (options.msgs.find(m => m instanceof MsgAminoCustom)
            ? SignModeV2.SIGN_MODE_LEGACY_AMINO_JSON
            : this.lcd.config[options.chainID].isClassic
            ? SignModeV1.SIGN_MODE_DIRECT
            : SignModeV2.SIGN_MODE_DIRECT),
      },
      this.lcd.config[options.chainID].isClassic
    );
  }
}
