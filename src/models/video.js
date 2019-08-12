import {
    index,
} from '@/services/video';

export default {
    namespace: 'video',
    state: {
        list: [],
        total: 0,
    },
    effects: {
        *index({ payload: { page, pageSize }, callback = null }, { call, put }) {
            const response = yield call(index, page, pageSize);
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
                list,
                total,
            };
        }
    },
};