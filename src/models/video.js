import {
    index,
    show,
} from '@/services/video';

export default {
    namespace: 'video',
    state: {
        list: [],
        total: 0,
        detail: null,
        actressList: [],
        series: null,
        categoryArr: [],
        formValue: {
            code: '',
        },
    },
    effects: {
        *index({ payload: { page = 1, pageSize = 10, actressId = '', code = '' }, callback = null }, { call, put }) {
            const response = yield call(index, page, pageSize, actressId, code);
            if (response.success) {
                yield put({
                    type: 'setList',
                    payload: {
                        data: response.data,
                        formValue: {
                            code,
                        },
                    },
                });
                callback && callback();
            }
        },
        *show({ payload: { id }, callback }, { call, put }) {
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
                list,
                total,
                formValue,
            };
        },
        setDetail(state, { payload }) {
            return {
                ...state,
                detail: payload.video,
                actressList: Array.isArray(payload.actress) ? payload.actress : [],
                series: payload.series,
                categoryArr: payload.categoryArr,
            };
        },
    },
};