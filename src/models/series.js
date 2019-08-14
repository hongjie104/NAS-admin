import {
    index,
} from '@/services/series';

export default {
    namespace: 'series',
    state: {
        list: [],
        total: 0,
        formValue: {
            name: '',
        },
    },
    effects: {
        *index({ payload: { page = 1, pageSize = 10, name = '' }, callback = null }, { call, put }) {
            const response = yield call(index, page, pageSize, name);
            if (response.success) {
                yield put({
                    type: 'setList',
                    payload: {
                        data: response.data,
                        formValue: {
                            name,
                        },
                    },
                });
                callback && callback();
            }
        },
        // *show({ payload: { id }, callback }, { call, put }) {
        //     const response = yield call(show, id);
        //     if (response.success) {
        //         yield put({
        //             type: 'setDetail',
        //             payload: response.data,
        //         });
        //         callback && callback();
        //     }
        // },
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
        // setDetail(state, { payload }) {
        //     return {
        //         ...state,
        //         detail: payload.video,
        //         actressList: Array.isArray(payload.actress) ? payload.actress : [],
        //         series: payload.series,
        //         categoryArr: payload.categoryArr,
        //     };
        // },
    },
};