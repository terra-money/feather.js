// Adapted from https://github.com/terra-money/terra-js/blob/master/src/utils/keyUtils.ts

import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import { RawKey } from './RawKey';

export const DEFAULT_COINTYPE = 330;

export interface SeedKeyOptions {
  /**
   * Buffer containing the seed.
   */
  seed: Buffer;

  /**
   * BIP44 account number.
   */
  account?: number;

  /**
   * BIP44 index number
   */
  index?: number;

  /**
   * Coin type. Default is LUNA, 330.
   */
  coinType?: number;
}

const DEFAULT_OPTIONS = {
  account: 0,
  index: 0,
  coinType: DEFAULT_COINTYPE,
};

/**
 * Implements a BIP39 mnemonic wallet with standard key derivation from a word list. Note
 * that this implementation exposes the private key in memory, so it is not advised to use
 * for applications requiring high security.
 */
export class SeedKey extends RawKey {
  /**
   * Buffer containing the seed.
   */
  public seed: Buffer;

  /**
   * Creates a new signing key from a seed.
   *
   * ### Providing a seed
   *
   * ```ts
   * import { SeedKey } from 'terra.js';
   *
   * const sk = new SeedKey({ seed: '...' });
   * console.log(mk.accAddress);
   * ```
   *
   * ### Generating a seed from a mnemonic
   *
   * ```ts
   * const seed = SeedKey.seedFromMnemonic('...);
   * console.log(seed);
   * ```
   *
   * @param options
   */
  constructor(options: SeedKeyOptions) {
    const { account, index, coinType } = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
    const { seed } = options;
    const masterKey = bip32.fromSeed(seed);
    const derivationPath = `m/44'/${coinType}'/${account}'/0/${index}`;
    const hd = masterKey.derivePath(derivationPath);
    const privateKey = hd.privateKey;

    if (!privateKey) {
      throw new Error('Failed to derive key pair');
    }

    super(privateKey);
    this.seed = seed;
  }

  public static seedFromMnemonic(mnemonic: string): Buffer {
    return bip39.mnemonicToSeedSync(mnemonic);
  }
}
