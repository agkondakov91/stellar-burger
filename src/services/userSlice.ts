import { TUser } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  TRegisterData,
  loginUserApi,
  TLoginData,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../utils/burger-api';
import { deleteCookie, setCookie, getCookie } from '../utils/cookie';

export const authCheckUser = createAsyncThunk(
  'user/authCheckUser',
  async (_, { dispatch, rejectWithValue }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => {
          dispatch(checkUser(res.user));
        })
        .catch((err) => {
          rejectWithValue(err);
        })
        .finally(() => dispatch(authCheck()));
    } else {
      dispatch(authCheck());
    }
  }
);

export const fetchRegisterUser = createAsyncThunk(
  'user/registerUser',
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const fetchLoginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const fetchForgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (userData: { email: string }) => await forgotPasswordApi(userData)
);

export const fetchResetPassword = createAsyncThunk(
  'user/resetPassword',
  async (userData: { password: string; token: string }) =>
    await resetPasswordApi(userData)
);

export const fetchGetUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const fetchUpdateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<TRegisterData>) => await updateUserApi(userData)
);

export const fetchLogout = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi().then(() => {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(userLogout());
    });
  }
);

type TUserState = {
  isAuthChecked: boolean;
  userData: TUser | null;
  isLoading: boolean;
  error: string | undefined;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  userData: null,
  isLoading: false,
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.userData = null;
    },
    checkUser: (state, action) => {
      state.userData = action.payload;
    }
  },
  selectors: {
    selectAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.userData = action.payload;
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.userData = action.payload;
      })
      .addCase(fetchGetUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.userData = action.payload.user;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.userData = action.payload.user;
      });
  }
});

export const { authCheck, userLogout, checkUser } = userSlice.actions;
export const reducerUser = userSlice.reducer;
export const { selectAuthChecked } = userSlice.selectors;
