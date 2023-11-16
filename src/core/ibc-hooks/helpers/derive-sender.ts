import { AccAddress } from '../../../core/bech32';
import { bech32 } from 'bech32';
import { createHash } from 'crypto';

const senderPrefix = 'ibc-wasm-hook-intermediary';

// Function used to derive the counterparty chain address from the
// ibc channel, originSender and bech32prefix, for ibc-hooks.
//
// This function is ported to JS from the following Go code:
// https://github.com/cosmos/ibc-apps/blob/main/modules/ibc-hooks/keeper/keeper.go#L57-L62
export const deriveIbcHooksSender = (
  channel: string,
  originSender: AccAddress,
  bech32Prefix: string
): AccAddress => {
  const concatedAddress = `${channel}/${originSender}`;
  const senderSHA256 = hash(senderPrefix, Buffer.from(concatedAddress));
  const words = bech32.toWords(senderSHA256);

  return bech32.encode(bech32Prefix, words).toString();
};

// private function to derive the string hash,
// bassed on the following Go code:
// https://github.com/cosmos/cosmos-sdk/blob/release/v0.47.x/types/address/hash.go#L26-L39
const hash = (typ: string, key: Buffer): Buffer => {
  let hasher = createHash('sha256');

  // Convert the string to a Buffer
  const typeBuffer = Buffer.from(typ, 'utf-8');

  // First hash
  hasher.update(typeBuffer);
  const th = hasher.digest();
  hasher = createHash('sha256');

  // Reset the hasher and do the second hash
  hasher.update(th);
  hasher.update(key);

  return hasher.digest();
};
