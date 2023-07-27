import { SHA256, Word32Array } from 'jscrypto';
import * as secp256k1 from 'secp256k1';
import keccak256 from 'keccak256';
import { Wallet } from 'ethers';
import * as BytesUtils from '@ethersproject/bytes';
import { Key } from './Key';
import { InjectivePubKey, SimplePublicKey } from '../core/PublicKey';

/**
 * An implementation of the Key interfaces that uses a raw private key.
 */
export class RawKey extends Key {
  /**
   * Raw private key, in bytes.
   */
  public privateKey: Buffer;

  constructor(privateKey: Buffer, private isInjective?: boolean) {
    const publicKey = secp256k1.publicKeyCreate(
      new Uint8Array(privateKey),
      true
    );
    super(
      isInjective
        ? new InjectivePubKey(Buffer.from(publicKey).toString('base64'))
        : new SimplePublicKey(Buffer.from(publicKey).toString('base64'))
    );
    this.privateKey = privateKey;
  }

  public ecdsaSign(payload: Buffer): { signature: Uint8Array; recid: number } {
    const hash = Buffer.from(
      SHA256.hash(new Word32Array(payload)).toString(),
      'hex'
    );
    return secp256k1.ecdsaSign(
      Uint8Array.from(hash),
      Uint8Array.from(this.privateKey)
    );
  }

  public etherSign(payload: Buffer): { signature: Uint8Array } {
    const hash = keccak256(payload);

    const wallet = new Wallet(this.privateKey);

    const signature = wallet._signingKey().signDigest(hash);

    return {
      signature: BytesUtils.arrayify(
        BytesUtils.concat([signature.r, signature.s])
      ),
    };
  }

  public async sign(payload: Buffer): Promise<Buffer> {
    const { signature } = this.isInjective
      ? this.etherSign(payload)
      : this.ecdsaSign(payload);
    return Buffer.from(signature);
  }
}
