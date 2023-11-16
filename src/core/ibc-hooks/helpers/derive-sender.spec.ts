import { deriveIbcHooksSender } from './derive-sender';

describe('Must use DeriveIbcHooksSender to derive', () => {
  it('a terra address successfully for channel-0 and prefix terra', () => {
    const derived = deriveIbcHooksSender(
      'channel-0',
      'terra18qq9svm5tjywcysd549tzkk3ax04f43zml9xay',
      'terra'
    );

    expect(derived).toStrictEqual(
      'terra1qxyr66gyd6fjlr0826cce8fj4jg96hd5jdkg4e3e2hc3gl0r9zps9sc93t'
    );
  });

  it('a terra address successfully for channel-1 and prefix terra', () => {
    const derived = deriveIbcHooksSender(
      'channel-1',
      'terra18qq9svm5tjywcysd549tzkk3ax04f43zml9xay',
      'terra'
    );

    expect(derived).toStrictEqual(
      'terra1tdx2llx7dxp245p32rl5xf85qtfhnsn477fs6man34lthdcmr6wsxntykd'
    );
  });

  it('a terra address successfully for channel-1 and prefix juno', () => {
    const derived = deriveIbcHooksSender(
      'channel-0',
      'terra18qq9svm5tjywcysd549tzkk3ax04f43zml9xay',
      'juno'
    );

    expect(derived).toStrictEqual(
      'juno1qxyr66gyd6fjlr0826cce8fj4jg96hd5jdkg4e3e2hc3gl0r9zpsrpuvys'
    );
  });

  it('a juno address successfully for channel-0 and prefix terra', () => {
    const derived = deriveIbcHooksSender(
      'channel-0',
      'juno1yd8m9u8gexcjectscrduxmtw60psndqhcd87jt',
      'terra'
    );

    expect(derived).toStrictEqual(
      'terra1njxpjzu233h4ctlsyvqq4nuxl5y5cu9lxuprnqmv574ddqkqu7zqxg6u3k'
    );
  });
});
