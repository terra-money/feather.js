import { Height } from '../../../core/ibc/core/client/Height';
import { LCDClient } from '../LCDClient';
import { IbcAPI } from './IbcAPI';

const lcd = LCDClient.fromDefaultConfig('testnet');
const ibc = new IbcAPI(lcd);

describe('IbcClientAPI', () => {
  it('params', async () => {
    const param = await ibc.parameters('pisco-1');
    expect(param.allowed_clients).not.toBeNull();
    expect(param.allowed_clients).not.toBeUndefined();
  });

  it('client_states', async () => {
    const res = await ibc.clientStates('pisco-1');
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });

  it('client_state', async () => {
    const res = await ibc.clientState('07-tendermint-0', 'pisco-1');
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });

  it('client_status', async () => {
    const res = await ibc.clientStatus('07-tendermint-0', 'pisco-1');
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });

  it('consensus_states', async () => {
    const res = await ibc.consensusStates('07-tendermint-0', 'pisco-1');
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });

  it('ica host paramaters', async () => {
    const res = await ibc.interchainAccountHostParameters('pisco-1');
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });

  it('ica controller paramaters', async () => {
    const res = await ibc.interchainAccountControllerParameters('pisco-1');
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });

  it('channels', async () => {
    const [res] = await ibc.channels('pisco-1');
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
    expect(res.length).toBeGreaterThan(0);
  });

  it('channels for a connection', async () => {
    const [res, height] = await ibc.connectionChannels(
      'connection-3',
      'pisco-1'
    );
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
    expect(height).not.toBeNull();
    expect(height).toBeInstanceOf(Height);
    expect(res.length).toBeGreaterThan(0);
  });

  it('port', async () => {
    const res = await ibc.port('channel-0', 'transfer', 'pisco-1');
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
    expect(res).toHaveProperty('channel');
    expect(res).toHaveProperty('proof');
    expect(res).toHaveProperty('proof_height');
  });

  it('connections', async () => {
    const [res] = await ibc.connections('pisco-1');
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
    expect(res.length).toBeGreaterThan(0);
  });

  it('a connection', async () => {
    const res = await ibc.connection('connection-0', 'pisco-1');
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });
});
