import { APIRequester } from './APIRequester';
import {
  AuthAPI,
  BankAPI,
  DistributionAPI,
  FeeGrantAPI,
  GovAPI,
  MintAPI,
  AuthzAPI,
  SlashingAPI,
  StakingAPI,
  TendermintAPI,
  TxAPI,
  WasmAPI,
  IbcTransferAPI,
  IbcAPI,
} from './api';
import { LCDUtils } from './LCDUtils';
import { Wallet } from './Wallet';
import { Numeric } from '../../core/numeric';
import { Coins } from '../../core/Coins';
import { Key } from '../../key';

export interface LCDClientConfig {
  /**
   * The base URL to which LCD requests will be made.
   */
  lcd: string;

  /**
   * Chain ID of the blockchain to connect to.
   */
  chainID: string;

  /**
   * Coins representing the default gas prices to use for fee estimation.
   */
  gasPrices: Coins.Input;

  /**
   * Number presenting the default gas adjustment value to use for fee estimation.
   */
  gasAdjustment: Numeric.Input;

  /**
   * Bech32 prefix for wallet and contract addresses.
   */
  prefix: string;
}

const DEFAULT_NETWORK_CONFIG: Record<
  'mainnet' | 'testnet' | 'local',
  Record<string, LCDClientConfig>
> = {
  mainnet: {
    'phoenix-1': {
      chainID: 'phoenix-1',
      lcd: 'https://phoenix-lcd.terra.dev',
      gasAdjustment: 1.75,
      gasPrices: { uluna: 0.015 },
      prefix: 'terra',
    },
  },
  testnet: {
    'pisco-1': {
      chainID: 'pisco-1',
      lcd: 'https://pisco-lcd.terra.dev',
      gasAdjustment: 1.75,
      gasPrices: { uluna: 0.015 },
      prefix: 'terra',
    },
  },
  local: {},
};

/**
 * An object repesenting a connection to a terrad node running the Lite Client Daemon (LCD)
 * server, a REST server providing access to a node.
 *
 * ### Example
 *
 * ```ts
 * import { LCDClient } from '@terra-money/station.js';
 *
 * const terra = new LCDClient('mainnet');
 *
 * const balance = await lcd.bank.balance('terra1...'):
 * console.log(balance);
 * ```
 */

export class LCDClient {
  public config: Record<string, LCDClientConfig>;
  public apiRequesters: Record<string, APIRequester>;

  // API access
  public auth: AuthAPI;
  public bank: BankAPI;
  public distribution: DistributionAPI;
  public feeGrant: FeeGrantAPI;
  public gov: GovAPI;
  public mint: MintAPI;
  public authz: AuthzAPI;
  public slashing: SlashingAPI;
  public staking: StakingAPI;
  public tendermint: TendermintAPI;
  public wasm: WasmAPI;
  public tx: TxAPI;
  public ibc: IbcAPI;
  public ibcTransfer: IbcTransferAPI;
  public utils: LCDUtils;

  /**
   * Creates a new LCD client with the specified configuration.
   *
   * @param network select mainnet, testnet or local
   *
   * @param chains (optional) add other chains to the default configuration
   *
   */
  constructor(chains: Record<string, LCDClientConfig>) {
    this.config = chains;

    this.apiRequesters = Object.keys(chains).reduce(
      (result: Record<string, APIRequester>, chainID) => {
        result[chainID] = new APIRequester(chains[chainID].lcd);
        return result;
      },
      {}
    );

    // instantiate APIs
    this.auth = new AuthAPI(this);
    this.bank = new BankAPI(this);
    this.distribution = new DistributionAPI(this);
    this.feeGrant = new FeeGrantAPI(this);
    this.gov = new GovAPI(this);
    this.mint = new MintAPI(this);
    this.authz = new AuthzAPI(this);
    this.slashing = new SlashingAPI(this);
    this.staking = new StakingAPI(this);
    this.tendermint = new TendermintAPI(this);
    this.wasm = new WasmAPI(this);
    this.ibc = new IbcAPI(this);
    this.ibcTransfer = new IbcTransferAPI(this);
    this.tx = new TxAPI(this);
    this.utils = new LCDUtils(this);
  }

  public static fromDefaultConfig(network: 'mainnet' | 'testnet') {
    // TODO: fetch config from assets.terra.money
    return new LCDClient(DEFAULT_NETWORK_CONFIG[network]);
  }

  /** Creates a new wallet with the Key. */
  public wallet(key: Key): Wallet {
    return new Wallet(this, key);
  }
}
