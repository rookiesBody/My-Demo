
import { Reducer } from 'redux';
import { Effect } from 'dva';

export interface UserModelState {
  userInfo: any,
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    getUserInfo: Effect;
  };
  reducers: {
    changeUserInfo: Reducer;
  };
}

const UserInfo: UserModelType = {
  namespace: 'user',

  state: {
    userInfo: {}
  },

  effects: {
    *getUserInfo({ payload }, { call, put }) {
      console.log('payload==', payload);

      if (payload) {
        yield put({
          type: 'changeUserInfo',
          payload,
        })
      }
    },
  },

  reducers: {
    changeUserInfo(state: any, { payload }) {

      return {
        ...state,
        userInfo: {...state.userInfo, ...payload}
      }
    }
  }
}

export default UserInfo;
