import React from 'react';
import {
  createCurrentUser,
  createListing,
  createTransaction,
  createUser,
  fakeIntl,
} from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { getProcess } from '../../util/transaction';
import { TransactionPageComponent } from './TransactionPage';

const noop = () => null;
const transitions = getProcess('flex-product-default-process')?.transitions;

describe('TransactionPage - Sale', () => {
  it('matches snapshot', () => {
    const txId = 'tx-sale-1';
    const start = new Date(Date.UTC(2017, 5, 10));
    const end = new Date(Date.UTC(2017, 5, 13));
    const transaction = createTransaction({
      id: txId,
      lastTransition: transitions.CONFIRM_PAYMENT,
      listing: createListing('listing1', { publicData: { unitType: 'item' } }),
      customer: createUser('customer1'),
      provider: createUser('provider1'),
    });

    const props = {
      params: { id: txId },
      transactionRole: 'provider',

      currentUser: createCurrentUser('provider1'),
      onTransition: noop,
      scrollingDisabled: false,
      callSetInitialValues: noop,
      transaction,
      totalMessages: 0,
      totalMessagePages: 0,
      oldestMessagePageFetched: 0,
      messages: [],
      sendMessageInProgress: false,
      onInitializeCardPaymentData: noop,
      onShowMoreMessages: noop,
      onSendMessage: noop,
      onResetForm: noop,
      onFetchTransactionLineItems: noop,
      fetchLineItemsInProgress: false,
      intl: fakeIntl,
      onFetchTimeSlots: noop,

      location: {
        pathname: `/sale/${txId}/details`,
        search: '',
        hash: '',
      },
      history: {
        push: () => console.log('HistoryPush called'),
      },
    };

    const tree = renderShallow(<TransactionPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('TransactionPage - Order', () => {
  it('matches snapshot', () => {
    const txId = 'tx-order-1';
    const start = new Date(Date.UTC(2017, 5, 10));
    const end = new Date(Date.UTC(2017, 5, 13));

    const transaction = createTransaction({
      id: txId,
      lastTransition: transitions.CONFIRM_PAYMENT,
      listing: createListing('listing1', { publicData: { unitType: 'item' } }),
      customer: createUser('customer1'),
      provider: createUser('provider1'),
    });

    const props = {
      params: { id: txId },
      transactionRole: 'customer',

      currentUser: createCurrentUser('customer1'),
      totalMessages: 0,
      totalMessagePages: 0,
      oldestMessagePageFetched: 0,
      messages: [],
      fetchMessagesInProgress: false,
      sendMessageInProgress: false,
      scrollingDisabled: false,
      callSetInitialValues: noop,
      transaction,
      onInitializeCardPaymentData: noop,
      onShowMoreMessages: noop,
      onSendMessage: noop,
      onResetForm: noop,
      onFetchTransactionLineItems: noop,
      fetchLineItemsInProgress: false,
      intl: fakeIntl,

      onTransition: noop,
      onFetchTimeSlots: noop,

      location: {
        pathname: `/order/${txId}/details`,
        search: '',
        hash: '',
      },
      history: {
        push: () => console.log('HistoryPush called'),
      },
    };

    const tree = renderShallow(<TransactionPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
