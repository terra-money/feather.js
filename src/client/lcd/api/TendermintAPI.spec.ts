import { TendermintAPI } from './TendermintAPI';
import { Tx } from '../../../core/Tx';
import { Tx as Tx_pb } from '@terra-money/legacy.proto/cosmos/tx/v1beta1/tx';
import { LCDClient } from '../LCDClient';

const lcd = LCDClient.fromDefaultConfig('testnet');
const tendermint = new TendermintAPI(lcd);

describe('TendermintAPI', () => {
  it('load block and decode txs', async () => {
    const blockInfo = await tendermint.blockInfo('pisco-1', 1);
    if (blockInfo.block.data.txs != null) {
      blockInfo.block.data.txs.every(txBytes => {
        const txProto = Tx_pb.decode(Buffer.from(txBytes, 'base64'));
        expect(Tx.fromProto(txProto)).toBeDefined();
      });
    }
  });

  it('node info', async () => {
    await expect(tendermint.nodeInfo('pisco-1')).resolves.toBeInstanceOf(
      Object
    );
  });

  it('syncing', async () => {
    await expect(tendermint.syncing('pisco-1')).resolves;
  });

  it('validator set (latest)', async () => {
    const vals = await tendermint.validatorSet('pisco-1');

    expect(vals[0]).toContainEqual({
      address: expect.any(String),
      pub_key: {
        '@type': expect.any(String),
        key: expect.any(String),
      },
      proposer_priority: expect.any(String),
      voting_power: expect.any(String),
    });
  });

  it('validator set (1)', async () => {
    const vals = await tendermint.validatorSet('pisco-1', 1);

    expect(vals[0]).toContainEqual({
      address: expect.any(String),
      pub_key: {
        '@type': expect.any(String),
        key: expect.any(String),
      },
      proposer_priority: expect.any(String),
      voting_power: expect.any(String),
    });
  });

  it('block info', async () => {
    const block = await tendermint.blockInfo('pisco-1');

    expect(block).toMatchObject({
      block: expect.any(Object),
    });
  });
});
