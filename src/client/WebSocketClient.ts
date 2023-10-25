import { EventEmitter } from 'events';
import WebSocket from 'ws';
import { hashToHex } from '../util/hash';
import { TendermintQuery } from '../util/TendermintQuery';

type Callback = (data: TendermintSubscriptionResponse) => void;

export interface TendermintSubscriptionResponse {
  type: string;
  value: Record<string, any>;
}

export type TendermintEventType =
  | 'NewBlock'
  | 'NewBlockHeader'
  | 'Evidence'
  | 'Tx'
  | 'ValidatorSetUpdates'
  | 'CompleteProposal'
  | 'Lock'
  | 'NewRound'
  | 'NewRoundStep'
  | 'Polka'
  | 'Relock'
  | 'Relock'
  | 'TimeoutPropose'
  | 'TimeoutWait'
  | 'Unlock'
  | 'ValidBlock'
  | 'Vote';

/**
 * An object repesenting a connection to a Terra node's WebSocket RPC endpoint.
 * This allows for subscribing to Tendermint events through WebSocket.
 *
 * ### Events
 * - **error** emitted when error raises
 * - **connect** emitted after connection establishment
 * - **reconnect** emitted upon every attempt of reconnection
 * - **destroyed** emitted when socket has been destroyed
 *
 * ### Example
 *
 * ```ts
 * import { TendermintQuery, WebSocketClient } from '@terra-money/terra.js';
 *
 * const wsclient = new WebSocketClient("ws://localhost:26657/websocket");
 * wsclient.start();
 * wsclient.on('connect', () => {
 *   wsclient.subscribe('NewBlock', new TendermintQuery(), (data) => {
 *     console.log(data.value);
 *
 *     // close after receiving one block.
 *     wsclient.destroy();
 *   });
 *
 *   wsclient.subscribe(
 *     'Tx',
 *     new TendermintQuery()
 *       .exact('message.action', 'send')
 *       .contains('message.sender', 'terra1...'),
 *     (data) => {
 *       console.log(data.value);
 *
 *       // close after receiving one send Tx
 *       wsclient.destroy();
 *     },
 *   );
 * });
 * ```
 */
export class WebSocketClient extends EventEmitter {
  private _connected: boolean;
  private reconnectTimeoutId?: NodeJS.Timeout;
  private callbacks = new Map<number, (data: any) => void>();
  private shouldAttemptReconnect: boolean;
  private socket!: WebSocket;
  private _reconnectCount: number;
  private _nextSubId = 1;

  /**
   * WebSocketClient constructor
   * @param URL The WebSocket endpoint URL on the Tendermint RPC server.
   *            Ex: ws://localhost:26657/websocket
   * @param reconnectCount 0 for not to attempt reconnect, -1 for infinite, > 0 for number of times to attempt
   * @param reconnectInterval retry interval in milliseconds
   */
  constructor(
    private URL: string,
    private reconnectCount = 0,
    private reconnectInterval = 1000
  ) {
    super();
    this._reconnectCount = this.reconnectCount;
    this._connected = false;
    this.shouldAttemptReconnect = !!this.reconnectInterval;
  }

  /**
   * Destroys class as well as socket
   */
  destroy() {
    this.shouldAttemptReconnect = false;
    this.reconnectTimeoutId && clearTimeout(this.reconnectTimeoutId);
    this.socket && this.socket.close();
  }

  start() {
    this.socket = new WebSocket(this.URL);

    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onerror = () => undefined;
  }

  send(data: any) {
    if (this.socket) {
      this.socket.send(JSON.stringify(data));
    }
    return this;
  }

  private onOpen() {
    this._connected = true;
    this.emit('connect');
    // reset reconnectCount after connection establishment
    this._reconnectCount = this.reconnectCount;
  }

  private onMessage(message: WebSocket.MessageEvent) {
    const data = message.data.toString();

    // ignore empty messages. fixes "unexpected EOF"
    if (!data.trim()) return;

    try {
      const parsedData = JSON.parse(message.data.toString());
      if (!('result' in parsedData && 'id' in parsedData)) {
        throw new Error('Invalid message format');
      }

      if (parsedData.result?.data) {
        this.callbacks.get(parsedData.id)?.(parsedData.result.data);
      }
    } catch (err) {
      this.emit('error', err);
    }
  }

  private onClose() {
    this._connected = false;

    if (
      this.shouldAttemptReconnect &&
      (this._reconnectCount > 0 || this._reconnectCount === -1)
    ) {
      if (this._reconnectCount !== -1) {
        this._reconnectCount--;
      }

      this.reconnectTimeoutId && clearTimeout(this.reconnectTimeoutId);
      this.reconnectTimeoutId = setTimeout(() => {
        this.emit('reconnect');
        this.start();
      }, this.reconnectInterval);
    } else {
      this.emit('destroyed');
    }
  }

  public subscribe(
    event: TendermintEventType,
    query: TendermintQuery,
    callback: Callback
  ) {
    const id = this._nextSubId++;
    query = query.clone().exact('tm.event', event);

    this.send({
      jsonrpc: '2.0',
      method: 'subscribe',
      params: [query.toString()],
      id,
    });
    this.callbacks.set(id, callback);

    return this;
  }

  public subscribeTx(query: TendermintQuery, callback: Callback): void {
    const newCallback: Callback = d => {
      d.value.TxResult.txhash = hashToHex(d.value.TxResult.tx);
      return callback(d);
    };

    this.subscribe('Tx', query, newCallback);
  }

  get isConnected() {
    return this._connected;
  }
}
