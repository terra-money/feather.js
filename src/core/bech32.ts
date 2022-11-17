import { bech32 } from 'bech32';

/** `terra-` prefixed account address */
export type AccAddress = string;

/** `terravaloper-` prefixed validator operator address */
export type ValAddress = string;

/** `terravalcons-` prefixed validator consensus address */
export type ValConsAddress = string;

/** `terrapub-` prefixed account public key */
export type AccPubKey = string;

/** `terravaloperpub-` prefixed validator public key */
export type ValPubKey = string;

function checkPrefixAndLength(
  prefix: string,
  data: string,
  length: number
): boolean {
  try {
    const vals = bech32.decode(data);
    return vals.prefix === prefix && data.length == length;
  } catch (e) {
    return false;
  }
}

export namespace AccAddress {
  /**
   * Checks if a string is a valid Terra account address.
   *
   * @param data string to check
   * @param prefix expected chain prefix
   */
  export function validate(data: string, prefix: string): boolean {
    // 44 for normal account and 64 for contract account
    return (
      checkPrefixAndLength(prefix, data, 44) ||
      checkPrefixAndLength(prefix, data, 64)
    );
  }

  /**
   * Converts a validator address into an account address
   *
   * @param address validator address
   */
  export function fromValAddress(address: ValAddress): AccAddress {
    const vals = bech32.decode(address);
    return bech32.encode(
      vals.prefix.substring(0, vals.prefix.length - 'valoper'.length),
      vals.words
    );
  }

  /**
   * Get the prfix of an account address
   *
   * @param address accont address
   */
  export function getPrefix(address: AccAddress): string {
    const vals = bech32.decode(address);
    return vals.prefix;
  }
}

export namespace AccPubKey {
  /**
   * Checks if a string is a Terra account's public key
   * @param data string to check
   * @param prefix expected chain prefix
   */

  export function validate(data: string, prefix: string): boolean {
    return checkPrefixAndLength(`${prefix}pub`, data, 47);
  }

  /**
   * Converts a Terra validator pubkey to an account pubkey.
   * @param address validator pubkey to convert
   * @param prefix expected chain prefix
   */
  export function fromAccAddress(
    address: AccAddress,
    prefix: string
  ): AccPubKey {
    const vals = bech32.decode(address);
    return bech32.encode(`${prefix}pub`, vals.words);
  }

  /**
   * Get the prefix of an account public key
   *
   * @param address accont address
   */
  export function getPrefix(address: AccPubKey): string {
    const vals = bech32.decode(address);
    return vals.prefix.substring(0, vals.prefix.length - 'pub'.length);
  }
}

export namespace ValAddress {
  /**
   * Checks if a string is a Terra validator address.
   *
   * @param data string to check
   * @param prefix expected chain prefix
   */
  export function validate(data: string, prefix: string): boolean {
    return checkPrefixAndLength(`${prefix}valoper`, data, 51);
  }

  /**
   * Converts a Terra account address to a validator address.
   * @param address account address to convert
   * @param prefix expected chain prefix
   */
  export function fromAccAddress(
    address: AccAddress,
    prefix: string
  ): ValAddress {
    const vals = bech32.decode(address);
    return bech32.encode(`${prefix}valoper`, vals.words);
  }

  /**
   * Get the prefix of a validator address
   *
   * @param address validator address
   */
  export function getPrefix(address: ValAddress): string {
    const vals = bech32.decode(address);
    return vals.prefix.substring(0, vals.prefix.length - 'valoper'.length);
  }
}

export namespace ValPubKey {
  /**
   * Checks if a string is a Terra validator pubkey
   * @param data string to check
   * @param prefix expected chain prefix
   */
  export function validate(data: string, prefix: string): boolean {
    return checkPrefixAndLength(`${prefix}valoperpub`, data, 54);
  }

  /**
   * Converts a Terra validator operator address to a validator pubkey.
   * @param valAddress account pubkey
   * @param prefix expected chain prefix
   */
  export function fromValAddress(
    valAddress: ValAddress,
    prefix: string
  ): ValPubKey {
    const vals = bech32.decode(valAddress);
    return bech32.encode(`${prefix}valoperpub`, vals.words);
  }

  /**
   * Get the prefix of a validator public key
   *
   * @param address validator public key
   */
  export function getPrefix(address: ValPubKey): string {
    const vals = bech32.decode(address);
    return vals.prefix.substring(0, vals.prefix.length - 'valoperpub'.length);
  }
}

export namespace ValConsAddress {
  /**
   * Checks if a string is a Terra validator consensus address
   * @param data string to check
   * @param prefix expected chain prefix
   */

  export function validate(data: string, prefix: string): boolean {
    return checkPrefixAndLength(`${prefix}valcons`, data, 51);
  }

  /**
   * Get the prefix of a validator consensus address
   *
   * @param address validator consensus address
   */
  export function getPrefix(address: ValConsAddress): string {
    const vals = bech32.decode(address);
    return vals.prefix.substring(0, vals.prefix.length - 'valcons'.length);
  }
}
