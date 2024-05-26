import {
  reducerOrder,
  getFetchFeeds,
  getFetchOrders,
  getFetchBurger,
  getFetchOrderByNumber,
  orderReset,
  initialState
} from './orderSlice';
import { TOrder, TOrdersData, TOrderState } from '@utils-types';

type ActionType = string;

const testPendingState = (
  actionType: ActionType,
  expectedState: TOrderState
) => {
  const action = { type: actionType };
  const state = reducerOrder(initialState, action);
  expect(state).toEqual(expectedState);
};

const testRejectedState = (
  actionType: ActionType,
  error: { message: string },
  expectedState: TOrderState
) => {
  const action = { type: actionType, error };
  const state = reducerOrder(initialState, action);
  expect(state).toEqual(expectedState);
};

const testFulfilledState = (
  actionType: ActionType,
  payload: any,
  expectedState: TOrderState
) => {
  const action = { type: actionType, payload };
  const state = reducerOrder(initialState, action);
  expect(state).toEqual(expectedState);
};

describe('[Тест]: проверка редьюсеров orderSlice', () => {
  it('Обработка начального состояния', () => {
    expect(reducerOrder(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });
  describe('[getFetchFeeds] тестирование состояний', () => {
    it('Обработка состояния pending', () => {
      testPendingState(getFetchFeeds.pending.type, {
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    it('Обработка состояния rejected', () => {
      const error = { message: 'Failed to fetch feeds' };
      testRejectedState(getFetchFeeds.rejected.type, error, {
        ...initialState,
        isLoading: false,
        error: error.message
      });
    });

    it('Обработка состояния fulfilled', () => {
      const mockPayload: TOrdersData = {
        orders: [],
        total: 500,
        totalToday: 100
      };
      testFulfilledState(getFetchFeeds.fulfilled.type, mockPayload, {
        ...initialState,
        isLoading: false,
        error: null,
        orderData: [],
        feed: mockPayload,
        orderRequest: false
      });
    });
  });

  describe('[getFetchOrders] тестирование состояний', () => {
    it('Обработка состояния pending', () => {
      testPendingState(getFetchOrders.pending.type, {
        ...initialState,
        isLoading: true,
        error: null,
        orderRequest: true
      });
    });

    it('Обработка состояния rejected', () => {
      const error = { message: 'Failed to fetch orders' };
      testRejectedState(getFetchOrders.rejected.type, error, {
        ...initialState,
        isLoading: false,
        error: error.message,
        orderRequest: false
      });
    });

    it('Обработка состояния fulfilled', () => {
      const mockPayload: TOrder[] = [
        {
          _id: '1',
          status: 'completed',
          name: 'order_one',
          createdAt: '2024-05-26',
          updatedAt: '2021-05-26',
          number: 1,
          ingredients: []
        },
        {
          _id: '2',
          status: 'completed',
          name: 'order_two',
          createdAt: '2024-05-26',
          updatedAt: '2024-05-26',
          number: 2,
          ingredients: []
        }
      ];
      testFulfilledState(getFetchOrders.fulfilled.type, mockPayload, {
        ...initialState,
        isLoading: false,
        error: null,
        orderRequest: false,
        orderData: mockPayload
      });
    });
  });

  describe('[getFetchBurger] тестирование состояний', () => {
    it('Обработка состояния pending', () => {
      testPendingState(getFetchBurger.pending.type, {
        ...initialState,
        isLoading: true,
        error: null,
        orderRequest: true
      });
    });

    it('Обработка состояния rejected', () => {
      const error = { message: 'Failed to fetch burger' };
      testRejectedState(getFetchBurger.rejected.type, error, {
        ...initialState,
        isLoading: false,
        error: error.message,
        orderRequest: false
      });
    });

    it('Обработка состояния fulfilled', () => {
      const mockPayload: TOrder = {
        _id: '1',
        status: 'completed',
        name: 'burger',
        createdAt: '2024-05-26',
        updatedAt: '2024-05-26',
        number: 1,
        ingredients: []
      };
      testFulfilledState(
        getFetchBurger.fulfilled.type,
        { order: mockPayload },
        {
          ...initialState,
          isLoading: false,
          error: null,
          orderRequest: false,
          orderModalData: mockPayload
        }
      );
    });
  });

  describe('[getFetchOrderByNumber] тестирование состояний', () => {
    it('Обработка состояния pending', () => {
      testPendingState(getFetchOrderByNumber.pending.type, {
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    it('Обработка состояния rejected', () => {
      const error = { message: 'Failed to fetch order by number' };
      testRejectedState(getFetchOrderByNumber.rejected.type, error, {
        ...initialState,
        isLoading: false,
        error: error.message
      });
    });

    it('Обработка состояния fulfilled', () => {
      const mockPayload: TOrder = {
        _id: '1',
        status: 'completed',
        name: 'order_by_number',
        createdAt: '2024-05-26',
        updatedAt: '2024-05-26',
        number: 1,
        ingredients: []
      };
      testFulfilledState(
        getFetchOrderByNumber.fulfilled.type,
        { orders: [mockPayload] },
        {
          ...initialState,
          isLoading: false,
          error: null,
          orderModalData: mockPayload
        }
      );
    });
  });

  describe('[orderReset] тестирование редьюсера', () => {
    it('orderReset action', () => {
      const action = orderReset();
      const state = reducerOrder(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orderRequest: false,
        orderModalData: null
      });
    });
  });
});
