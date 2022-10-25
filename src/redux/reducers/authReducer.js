import storage from '@react-native-async-storage/async-storage';
const initialState = {
  token: null,
  uuid: null,
  status: false,
};

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'LOG_IN': {
      return {
        status: true,
        uuid: payload?.user_uuid,
        token: payload?.token,

        ...payload,
      };
    }
    case 'LOG_OUT': {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
