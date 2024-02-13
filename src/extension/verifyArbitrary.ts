import { bech32 } from 'bech32';
import { AccAddress, PublicKey, Tx } from '../core';
import secp256k1 from 'secp256k1';
import keccak256 from 'keccak256';
import { SHA256, Word32Array } from 'jscrypto';
import { prepareSignBytes } from '../util/json';

export default function verifyArbitrary(
  signerAddress: AccAddress,
  data: string,
  signResult: {
    pub_key: PublicKey.Data;
    signature: string;
  }
) {
  if (Buffer.from(data, 'base64').toString('base64') !== data)
    throw new Error('Data must be a base64 encoded string');

  const prefix = bech32.decode(signerAddress).prefix;

  if (
    signerAddress !== PublicKey.fromData(signResult.pub_key).address(prefix)
  ) {
    // provided address does not match the pubkey used for the signature
    return false;
  }

  const tx = Buffer.from(
    JSON.stringify(
      prepareSignBytes({
        chain_id: '',
        account_number: '0',
        sequence: '0',
        fee: {
          gas: '0',
          amount: [],
        },
        msgs: [
          {
            type: 'sign/MsgSignData',
            value: {
              signer: signerAddress,
              data,
            },
          },
        ],
        memo: '',
      })
    )
  );

  const hash =
    signResult.pub_key['@type'] ===
    '/injective.crypto.v1beta1.ethsecp256k1.PubKey'
      ? keccak256(tx)
      : Buffer.from(SHA256.hash(new Word32Array(tx)).toString(), 'hex');

  return secp256k1.ecdsaVerify(
    Buffer.from(signResult.signature, 'base64'),
    hash,
    // @ts-expect-error
    Buffer.from(signResult.pub_key.key as string, 'base64')
  );
}
