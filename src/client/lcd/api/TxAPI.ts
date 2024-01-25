import { BaseAPI } from './BaseAPI';
import {
  Msg,
  Tx,
  Coins,
  TxInfo,
  Numeric,
  TxBody,
  AuthInfo,
  Fee,
  Dec,
  PublicKey,
} from '../../../core';
import { hashToHex } from '../../../util/hash';
import { LCDClient } from '../LCDClient';
import { TxLog } from '../../../core';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { BroadcastMode as BroadcastModeV1 } from '@terra-money/legacy.proto/cosmos/tx/v1beta1/service';
import { BroadcastMode as BroadcastModeV2 } from '@terra-money/terra.proto/cosmos/tx/v1beta1/service';

interface Wait {
  height: number;
  txhash: string;
  raw_log: string;
  gas_wanted: number;
  gas_used: number;
  logs: TxLog.Data[];
  timestamp: string;
}

interface Block extends Wait {
  info: string;
  data: string;
}

interface Sync {
  height: number;
  txhash: string;
  raw_log: string;
}

interface Async {
  height: number;
  txhash: string;
}

export type TxBroadcastResult<
  B extends Wait | Block | Sync | Async,
  C extends TxSuccess | TxError | {}
> = B & C;

export interface TxSuccess {
  logs: TxLog[];
}

export interface TxError {
  code: number | string;
  codespace?: string;
}

export type WaitTxBroadcastResult = TxBroadcastResult<
  Wait,
  TxSuccess | TxError
>;
export type BlockTxBroadcastResult = TxBroadcastResult<
  Block,
  TxSuccess | TxError
>;
export type SyncTxBroadcastResult = TxBroadcastResult<Sync, TxError | {}>;
export type AsyncTxBroadcastResult = TxBroadcastResult<Async, {}>;

export function isTxError<
  T extends TxBroadcastResult<B, C>,
  B extends Wait | Block | Sync,
  C extends TxSuccess | TxError | {}
>(x: T): x is T & TxBroadcastResult<B, TxError> {
  return (
    (x as T & TxError).code !== undefined &&
    (x as T & TxError).code !== 0 &&
    (x as T & TxError).code !== '0'
  );
}

export namespace BlockTxBroadcastResult {
  export interface Data {
    height: string;
    txhash: string;
    raw_log: string;
    gas_wanted: string;
    gas_used: string;
    logs: TxLog.Data[];
    code: number | string;
    codespace: string;
    info: string;
    data: string;
    timestamp: string;
  }
}

export namespace AsyncTxBroadcastResult {
  export type Data = Pick<BlockTxBroadcastResult.Data, 'height' | 'txhash'>;
}

export namespace SyncTxBroadcastResult {
  export type Data = Pick<
    BlockTxBroadcastResult.Data,
    'height' | 'txhash' | 'raw_log' | 'code' | 'codespace'
  >;
}

export interface SignerOptions {
  address: string;
  sequenceNumber?: number;
  publicKey?: PublicKey | null;
}

export interface SignerData {
  sequenceNumber: number;
  publicKey?: PublicKey | null;
}

export interface CreateTxOptions {
  chainID: string;
  msgs: Msg[];
  fee?: Fee;
  memo?: string;
  gas?: string;
  gasPrices?: Coins.Input;
  gasAdjustment?: Numeric.Input;
  feeDenoms?: string[];
  timeoutHeight?: number;
}

export interface TxResult {
  tx: TxInfo;
}

export namespace TxResult {
  export interface Data {
    tx: Tx.Data;
    tx_response: TxInfo.Data;
  }
}

export interface TxSearchResult {
  pagination: Pagination;
  txs: TxInfo[];
}

export namespace TxSearchResult {
  export interface Data {
    txs: Tx.Data[];
    tx_responses: TxInfo.Data[];
    pagination: Pagination;
  }
}

export class SimulateResponse {
  constructor(
    public gas_info: { gas_wanted: number; gas_used: number },
    public result: {
      data: string;
      log: string;
      events: { type: string; attributes: { key: string; value: string }[] }[];
    }
  ) {}

  public static fromData(data: SimulateResponse.Data): SimulateResponse {
    return new SimulateResponse(
      {
        gas_wanted: Number.parseInt(data.gas_info.gas_wanted),
        gas_used: Number.parseInt(data.gas_info.gas_used),
      },
      data.result
    );
  }
}

export namespace SimulateResponse {
  export interface Data {
    gas_info: {
      gas_wanted: string;
      gas_used: string;
    };
    result: {
      data: string;
      log: string;
      events: { type: string; attributes: { key: string; value: string }[] }[];
    };
  }
}

export interface TxSearchOptions extends PaginationOptions {
  events: { key: string; value: string }[];
}

export class TxAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequesters, lcd.config);
  }

  /**
   * Looks up a transaction on the blockchain, addressed by its hash
   * @param txHash transaction's hash
   * @param chainID chainID
   */
  public async txInfo(
    txHash: string,
    chainID: string,
    params: APIParams = {}
  ): Promise<TxInfo> {
    return this.getReqFromChainID(chainID)
      .getRaw<TxResult.Data>(`/cosmos/tx/v1beta1/txs/${txHash}`, params)
      .then(v => TxInfo.fromData(v.tx_response));
  }

  /**
   * Builds a [[StdSignMsg]] that is ready to be signed by a [[Key]]. The appropriate
   * account number and sequence will be fetched live from the blockchain and added to
   * the resultant [[StdSignMsg]]. If no fee is provided, fee will be automatically
   * estimated using the parameters, simulated using a "dummy fee" with sourceAddress's
   * nonzero denominations in its balance.
   *
   * @param sourceAddress account address of signer
   * @param options TX generation options
   */
  public async create(
    signers: SignerOptions[],
    options: CreateTxOptions
  ): Promise<Tx> {
    let { fee } = options;
    const { msgs, memo, timeoutHeight } = options;

    const signerDatas: SignerData[] = [];
    for (const signer of signers) {
      let sequenceNumber = signer.sequenceNumber;
      let publicKey = signer.publicKey;

      if (sequenceNumber === undefined || !publicKey) {
        const account = await this.lcd.auth.accountInfo(signer.address);
        if (sequenceNumber === undefined) {
          sequenceNumber = account.getSequenceNumber();
        }

        if (!publicKey) {
          publicKey = account.getPublicKey();
        }
      }

      signerDatas.push({
        sequenceNumber,
        publicKey,
      });
    }

    if (fee === undefined) {
      fee = await this.lcd.tx.estimateFee(signerDatas, options);
    }

    return new Tx(
      new TxBody(msgs, memo || '', timeoutHeight || 0),
      new AuthInfo([], fee),
      []
    );
  }

  /**
   * Looks up transactions on the blockchain for the block height. If height is undefined,
   * gets the transactions for the latest block.
   * @param chainID chain ID
   * @param height block height
   */
  public async txInfosByHeight(
    chainID: string,
    height: number | undefined
  ): Promise<TxInfo[]> {
    const blockInfo = await this.lcd.tendermint.blockInfo(chainID, height);
    const { txs } = blockInfo.block.data;
    if (!txs) {
      return [];
    } else {
      const txhashes = txs.map(txdata => hashToHex(txdata));
      const txInfos: TxInfo[] = [];

      for (const txhash of txhashes) {
        txInfos.push(await this.txInfo(txhash, chainID));
      }

      return txInfos;
    }
  }

  /**
   * Estimates the transaction's fee by simulating it within the node
   * @param sourceAddress address that will pay the bill
   * @param msgs standard messages
   * @param options options for fee estimation
   */
  public async estimateFee(
    signers: SignerData[],
    options: CreateTxOptions
  ): Promise<Fee> {
    const gasPrices =
      options.gasPrices || this.lcd.config[options.chainID].gasPrices;
    const gasAdjustment =
      options.gasAdjustment || this.lcd.config[options.chainID].gasAdjustment;
    const feeDenoms = options.feeDenoms;
    let gas = options.gas;
    let gasPricesCoins: Coins | undefined;

    if (gasPrices) {
      gasPricesCoins = new Coins(gasPrices);

      if (feeDenoms) {
        const gasPricesCoinsFiltered = gasPricesCoins.filter(c =>
          feeDenoms.includes(c.denom)
        );

        if (gasPricesCoinsFiltered.toArray().length > 0) {
          gasPricesCoins = gasPricesCoinsFiltered;
        }
      }
    }

    const txBody = new TxBody(options.msgs, options.memo || '');
    const authInfo = new AuthInfo([], new Fee(0, new Coins()));
    const tx = new Tx(txBody, authInfo, []);

    // fill empty signature
    tx.appendEmptySignatures(signers);

    // simulate gas
    if (!gas || gas === 'auto' || gas === '0') {
      gas = (
        await this.estimateGas(tx, options.chainID, { gasAdjustment })
      ).toString();
    }

    const feeAmount = gasPricesCoins
      ? gasPricesCoins.mul(gas).toIntCeilCoins()
      : `0${Object.keys(gasPrices)[0]}`;

    return new Fee(Number.parseInt(gas), feeAmount, '', '');
  }

  public async estimateGas(
    tx: Tx,
    chainID: string,
    options?: {
      gasAdjustment?: Numeric.Input;
      signers?: SignerData[];
    }
  ): Promise<number> {
    const gasAdjustment =
      options?.gasAdjustment || this.lcd.config[chainID].gasAdjustment;

    // append empty signatures if there's no signatures in tx
    let simTx: Tx = tx;
    if (tx.signatures.length <= 0) {
      if (!(options && options.signers && options.signers.length > 0)) {
        throw Error('cannot append signature');
      }
      const authInfo = new AuthInfo([], new Fee(0, new Coins()));
      simTx = new Tx(tx.body, authInfo, []);
      simTx.appendEmptySignatures(options.signers);
    }

    const simulateRes = await this.getReqFromChainID(chainID)
      .post<SimulateResponse.Data>(`/cosmos/tx/v1beta1/simulate`, {
        tx_bytes: this.encode(simTx, this.lcd.config[chainID].isClassic),
      })
      .then(d => SimulateResponse.fromData(d));

    return new Dec(gasAdjustment).mul(simulateRes.gas_info.gas_used).toNumber();
  }

  public async simulateTx(
    tx: Tx,
    chainID: string,
    options?: {
      gasAdjustment?: Numeric.Input;
      signers?: SignerData[];
    }
  ): Promise<SimulateResponse> {
    const gasAdjustment =
      options?.gasAdjustment || this.lcd.config[chainID].gasAdjustment;

    // append empty signatures if there's no signatures in tx
    let simTx: Tx = tx;
    if (tx.signatures.length <= 0) {
      if (!(options && options.signers && options.signers.length > 0)) {
        throw Error('cannot append signature');
      }
      const authInfo = new AuthInfo([], new Fee(0, new Coins()));
      simTx = new Tx(tx.body, authInfo, []);
      simTx.appendEmptySignatures(options.signers);
    }

    const simulateRes = await this.getReqFromChainID(chainID)
      .post<SimulateResponse.Data>(`/cosmos/tx/v1beta1/simulate`, {
        tx_bytes: this.encode(simTx, this.lcd.config[chainID].isClassic),
      })
      .then(d => SimulateResponse.fromData(d));

    simulateRes.gas_info.gas_used = new Dec(gasAdjustment)
      .mul(simulateRes.gas_info.gas_used)
      .toNumber();

    return simulateRes;
  }

  public async computeTax(): Promise<Coins> {
    throw new Error('Tax was removed from network');
  }

  /**
   * Encode a transaction to base64-encoded protobuf
   * @param tx transaction to encode
   */
  public encode(tx: Tx, isClassic?: boolean): string {
    return Buffer.from(tx.toBytes(isClassic)).toString('base64');
  }

  /**
   * Decode a transaction from base64-encoded protobuf
   * @param tx transaction string to decode
   */
  public decode(encodedTx: string): Tx {
    return Tx.fromBuffer(Buffer.from(encodedTx, 'base64'));
  }

  /**
   * Get the transaction's hash
   * @param tx transaction to hash
   */
  public async hash(tx: Tx): Promise<string> {
    const txBytes = await this.encode(tx);
    return hashToHex(txBytes);
  }

  private async _broadcast<T>(
    tx: Tx,
    mode: keyof typeof BroadcastModeV1 | BroadcastModeV2,
    chainID: string
  ): Promise<T> {
    return await this.getReqFromChainID(chainID).post<any>(
      `/cosmos/tx/v1beta1/txs`,
      {
        tx_bytes: this.encode(tx, this.lcd.config[chainID].isClassic),
        mode,
      }
    );
  }

  /**
   * Broadcast the transaction using "sync" mode, then wait for its inclusion in a block.
   *
   * This method polls txInfo using the txHash to confirm the transaction's execution.
   *
   * @param tx      transaction to broadcast
   * @param chainID chain ID
   * @param timeout time in milliseconds to wait for transaction to be included in a block. defaults to 30000
   */
  public async broadcast(
    tx: Tx,
    chainID: string,
    timeout = 30000
  ): Promise<WaitTxBroadcastResult> {
    const POLL_INTERVAL = 500;

    const { tx_response: txResponse } = await this._broadcast<{
      tx_response: SyncTxBroadcastResult.Data;
    }>(tx, 'BROADCAST_MODE_SYNC', chainID);

    if (txResponse.code != undefined && txResponse.code != 0) {
      const result: WaitTxBroadcastResult = {
        height: Number.parseInt(txResponse.height),
        txhash: txResponse.txhash,
        raw_log: txResponse.raw_log,
        code: txResponse.code,
        codespace: txResponse.codespace,
        gas_used: 0,
        gas_wanted: 0,
        timestamp: '',
        logs: [],
      };
      return result;
    }

    let txInfo: undefined | TxInfo;
    for (let i = 0; i <= timeout / POLL_INTERVAL; i++) {
      try {
        txInfo = await this.txInfo(txResponse.txhash, chainID);
      } catch (error) {
        // Errors when transaction is not found.
      }

      if (txInfo) {
        break;
      }

      await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
    }

    if (!txInfo) {
      throw new Error(
        `Transaction was not included in a block before timeout of ${timeout}ms`
      );
    }

    return {
      txhash: txInfo.txhash,
      raw_log: txInfo.raw_log,
      gas_wanted: txInfo.gas_wanted,
      gas_used: txInfo.gas_used,
      height: +txInfo.height,
      logs: (txInfo.logs || []).map(l => TxLog.fromData(l)),
      code: txInfo.code,
      codespace: txInfo.codespace,
      timestamp: txInfo.timestamp,
    };
  }

  /**
   * Broadcast the transaction using the "block" mode, waiting for its inclusion in the blockchain.
   * @param tx transaction to broadcast
   * @param chainID chain ID
   */
  public async broadcastBlock(
    tx: Tx,
    chainID: string
  ): Promise<BlockTxBroadcastResult> {
    return this._broadcast<{ tx_response: BlockTxBroadcastResult.Data }>(
      tx,
      'BROADCAST_MODE_BLOCK',
      chainID
    ).then(({ tx_response: d }) => {
      const blockResult: BlockTxBroadcastResult = {
        txhash: d.txhash,
        raw_log: d.raw_log,
        gas_wanted: Number.parseInt(d.gas_wanted),
        gas_used: Number.parseInt(d.gas_used),
        height: +d.height,
        logs: d.logs.map(l => TxLog.fromData(l)),
        code: d.code,
        codespace: d.codespace,
        data: d.data,
        info: d.info,
        timestamp: d.timestamp,
      };

      return blockResult;
    });
  }

  /**
   * NOTE: This is not a synchronous function and is unconventionally named. This function
   * can be await as it returns a `Promise`.
   *
   * Broadcast the transaction using the "sync" mode, returning after CheckTx() is performed.
   * @param tx transaction to broadcast
   * @param chainID chain ID
   */
  public async broadcastSync(
    tx: Tx,
    chainID: string
  ): Promise<SyncTxBroadcastResult> {
    return this._broadcast<{ tx_response: SyncTxBroadcastResult.Data }>(
      tx,
      'BROADCAST_MODE_SYNC',
      chainID
    ).then(({ tx_response: d }) => {
      const blockResult: any = {
        height: +d.height,
        txhash: d.txhash,
        raw_log: d.raw_log,
      };

      if (d.code) {
        blockResult.code = d.code;
      }

      if (d.codespace) {
        blockResult.codespace = d.codespace;
      }

      return blockResult;
    });
  }

  /**
   * Broadcast the transaction using the "async" mode, returns immediately (transaction might fail).
   * @param tx transaction to broadcast
   * @param chainID chain ID
   */
  public async broadcastAsync(
    tx: Tx,
    chainID: string
  ): Promise<AsyncTxBroadcastResult> {
    return this._broadcast<{ tx_response: AsyncTxBroadcastResult.Data }>(
      tx,
      'BROADCAST_MODE_ASYNC',
      chainID
    ).then(({ tx_response: d }) => ({
      height: +d.height,
      txhash: d.txhash,
    }));
  }

  /**
   * Search for transactions based on event attributes.
   * @param options
   * @param chainID chain ID
   */
  public async search(
    options: Partial<TxSearchOptions>,
    chainID: string
  ): Promise<TxSearchResult> {
    const params = new URLSearchParams();

    // build search params
    options.events?.forEach(v =>
      params.append(
        'events',
        v.key === 'tx.height' ? `${v.key}=${v.value}` : `${v.key}='${v.value}'`
      )
    );

    delete options['events'];

    Object.entries(options).forEach(v => {
      params.append(v[0], v[1] as string);
    });

    return this.getReqFromChainID(chainID)
      .getRaw<TxSearchResult.Data>(`/cosmos/tx/v1beta1/txs`, params)
      .then(d => {
        return {
          txs: d.tx_responses.map(tx_response => TxInfo.fromData(tx_response)),
          pagination: d.pagination,
        };
      });
  }
}
