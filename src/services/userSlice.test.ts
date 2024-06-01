import {
  reducerUser,
  fetchRegisterUser,
  fetchLoginUser,
  fetchGetUser,
  fetchUpdateUser,
  fetchLogout,
  authCheck,
  userLogout,
  checkUser,
  selectAuthChecked,
  initialState
} from './userSlice';
import { TUser } from '@utils-types';

type ActionType = string;

const testPendingState = (
  actionType: ActionType,
  expectedState: typeof initialState
) => {
  const action = { type: actionType };
  const state = reducerUser(initialState, action);
  expect(state).toEqual(expectedState);
};

const testRejectedState = (
  actionType: ActionType,
  error: { message: string },
  expectedState: typeof initialState
) => {
  const action = { type: actionType, error };
  const state = reducerUser(initialState, action);
  expect(state).toEqual(expectedState);
};

const testFulfilledState = (
  actionType: ActionType,
  payload: any,
  expectedState: typeof initialState
) => {
  const action = { type: actionType, payload };
  const state = reducerUser(initialState, action);
  expect(state).toEqual(expectedState);
};

describe('[Тест]: проверка редьюсеров userSlice', () => {
  it('Обработка начального состояния', () => {
    expect(reducerUser(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });
  describe('[fetchRegisterUser] тестирование состояний', () => {
    it('Обработка состояния pending', () => {
      testPendingState(fetchRegisterUser.pending.type, {
        ...initialState,
        isLoading: true,
        error: ''
      });
    });

    it('Обработка состояния rejected', () => {
      const error = { message: 'Failed to register user' };
      testRejectedState(fetchRegisterUser.rejected.type, error, {
        ...initialState,
        isLoading: false,
        error: error.message
      });
    });

    it('Обработка состояния fulfilled', () => {
      const mockUser: TUser = {
        email: 'test@example.com',
        name: 'Test User'
      };
      testFulfilledState(fetchRegisterUser.fulfilled.type, mockUser, {
        ...initialState,
        isLoading: false,
        error: '',
        userData: mockUser
      });
    });
  });

  describe('[fetchLoginUser] тестирование состояний', () => {
    it('Обработка состояния pending', () => {
      testPendingState(fetchLoginUser.pending.type, {
        ...initialState,
        isLoading: true,
        error: ''
      });
    });

    it('Обработка состояния rejected', () => {
      const error = { message: 'Failed to login user' };
      testRejectedState(fetchLoginUser.rejected.type, error, {
        ...initialState,
        isLoading: false,
        error: error.message
      });
    });

    it('Обработка состояния fulfilled', () => {
      const mockUser: TUser = {
        email: 'test@example.com',
        name: 'Test User'
      };
      testFulfilledState(fetchLoginUser.fulfilled.type, mockUser, {
        ...initialState,
        isLoading: false,
        error: '',
        userData: mockUser
      });
    });
  });

  describe('[fetchGetUser] тестирование состояний', () => {
    it('Обработка состояния pending', () => {
      testPendingState(fetchGetUser.pending.type, {
        ...initialState,
        isLoading: true,
        error: ''
      });
    });

    it('Обработка состояния rejected', () => {
      const error = { message: 'Failed to get user' };
      testRejectedState(fetchGetUser.rejected.type, error, {
        ...initialState,
        isLoading: false,
        error: error.message
      });
    });

    it('Обработка состояния fulfilled', () => {
      const mockUser: TUser = {
        email: 'test@example.com',
        name: 'Test User'
      };
      testFulfilledState(
        fetchGetUser.fulfilled.type,
        { user: mockUser },
        {
          ...initialState,
          isLoading: false,
          error: '',
          userData: mockUser
        }
      );
    });
  });

  describe('[fetchUpdateUser] тестирование состояний', () => {
    it('Обработка состояния pending', () => {
      testPendingState(fetchUpdateUser.pending.type, {
        ...initialState,
        isLoading: true,
        error: ''
      });
    });

    it('Обработка состояния rejected', () => {
      const error = { message: 'Failed to update user' };
      testRejectedState(fetchUpdateUser.rejected.type, error, {
        ...initialState,
        isLoading: false,
        error: error.message
      });
    });

    it('Обработка состояния fulfilled', () => {
      const mockUser: TUser = {
        email: 'test@example.com',
        name: 'Test User'
      };
      testFulfilledState(
        fetchUpdateUser.fulfilled.type,
        { user: mockUser },
        {
          ...initialState,
          isLoading: false,
          error: '',
          userData: mockUser
        }
      );
    });
  });

  describe('[fetchLogout] тестирование состояний', () => {
    it('Обработка состояния fulfilled', () => {
      testFulfilledState(
        fetchLogout.fulfilled.type,
        {},
        {
          ...initialState,
          userData: null
        }
      );
    });
  });

  describe('[authCheck] тестирование редьюсера', () => {
    it('authCheck action', () => {
      const action = authCheck();
      const state = reducerUser(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isAuthChecked: true
      });
    });
  });

  describe('[userLogout] тестирование редьюсера', () => {
    it('userLogout action', () => {
      const action = userLogout();
      const state = reducerUser(initialState, action);
      expect(state).toEqual({
        ...initialState,
        userData: null
      });
    });
  });

  describe('[checkUser] тестирование редьюсера', () => {
    it('checkUser action', () => {
      const mockUser: TUser = {
        email: 'test@example.com',
        name: 'Test User'
      };
      const action = checkUser(mockUser);
      const state = reducerUser(initialState, action);
      expect(state).toEqual({
        ...initialState,
        userData: mockUser
      });
    });
  });

  describe('[selectAuthChecked] тестирование селектора', () => {
    it('selectAuthChecked selector', () => {
      const state = {
        user: {
          ...initialState,
          isAuthChecked: true
        }
      };
      expect(selectAuthChecked(state)).toEqual(true);
    });
  });
});
