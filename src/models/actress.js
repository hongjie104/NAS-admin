import {
    index,
} from '@/services/actress';

export default {
    namespace: 'actress',
    state: {
        list: [],
        total: 0,
    },
    effects: {
        *index({ payload: { page, pageSize, name, sortBy }, callback = null }, { call, put }) {
            const response = yield call(index, page, pageSize, name, sortBy);
            if (response.success) {
                yield put({
                    type: 'setList',
                    payload: response.data,
                });
                callback && callback();
            }
        }
    },
    reducers: {
        setList(state, { payload: { list, total } }) {
            return {
                ...state,
                list: list || [],
                total,
            };
        }
    },
};