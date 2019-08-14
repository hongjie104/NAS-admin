import {
    index,
    show,
} from '@/services/actress';

export default {
    namespace: 'actress',
    state: {
        list: [],
        total: 0,
        detail: {
            actress: null,
            video: null,
            total: 0,
        },
        formValue: {
            name: '',
            sortBy: 'score-desc',
        },
    },
    effects: {
        *index({ payload: { page, pageSize, name, sortBy }, callback = null }, { call, put }) {
            const response = yield call(index, page, pageSize, name, sortBy);
            if (response.success) {
                yield put({
                    type: 'setList',
                    payload: {
                        data: response.data,
                        formValue: {
                            name,
                            sortBy,
                        },
                    },
                });
                callback && callback();
            }
        },
        *show({ payload: { id }, callback = null }, { call, put }) {
            const response = yield call(show, id);
            if (response.success) {
                yield put({
                    type: 'setDetail',
                    payload: response.data,
                });
                callback && callback();
            }
        },
    },
    reducers: {
        setList(state, { payload: { data: { list, total }, formValue, } }) {
            return {
                ...state,
                list: list || [],
                total,
                formValue,
            };
        },
        setDetail(state, { payload: { detail } }) {
            return {
                ...state,
                detail,
            }
        },
    },
};