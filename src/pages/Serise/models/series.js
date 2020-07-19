import {
    index,
    indexVideo,
} from '@/services/series';

export default {
    namespace: 'series',
    state: {
        loading: false,
        list: [],
        total: 0,
        formValue: {
            name: '',
        },
        videoList: [],
    },
    effects: {
        *index({ payload: { page = 1, pageSize = 10, name = '' }, callback = null }, { call, put }) {
            yield put({
                type: 'setLoading',
                payload: true,
            });
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
        *indexVideo({ payload: { page = 1, pageSize = 10, seriesId = "", }, callback = null }, { call, put }) {
            yield put({
                type: 'setLoading',
                payload: true,
            });
            const response = yield call(indexVideo, page, pageSize, seriesId);
            if (response.success) {
                yield put({
                    type: 'setVideoList',
                    payload: {
                        data: response.data,
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
        setList(state, { payload: { data: { list, pagination: { total, }, }, formValue, } }) {
            return {
                ...state,
                list: list || [],
                total,
                formValue,
                loading: false,
            };
        },
        setVideoList(state, { payload: { data: { list, pagination: { total, } } } }) {
            return {
                ...state,
                videoList: list || [],
                videoTotal: total,
                loading: false,
            };
        },
        setLoading(state, { payload }) {
            return {
                ...state,
                loading: !!payload,
            };
        },
    },
};