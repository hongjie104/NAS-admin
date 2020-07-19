import { message } from 'antd';
import { index, show, update } from '@/services/actress';
import { index as indexVideo } from '@/services/video';

export default {
    namespace: 'actress',
    state: {
        list: [],
        total: 0,
        detail: null,
        videoList: [],
        videoTotal: 0,
        page: 1,
        formValue: {
            name: '',
            sortBy: 'score-desc',
        },
        loading: false,
        submitting: false,
    },
    effects: {
        *index({ payload: { page, pageSize, name, sortBy }, callback = null }, { call, put, select, }) {
            yield put({
                type: 'setLoading',
                payload: true,
            });
            if (!page) {
                page = yield select(state => state.actress.page);
            }
            const response = yield call(index, page, pageSize, name, sortBy);
            if (response.success) {
                yield put({
                    type: 'setList',
                    payload: {
                        page,
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
            yield put({
                type: 'setLoading',
                payload: true,
            });
            const response = yield call(show, id);
            if (response.success) {
                yield put({
                    type: 'setDetail',
                    payload: response.data,
                });
                callback && callback(response.data);
            }
        },
        *update({ payload: { id, data }, callback = null }, { call, put }) {
            yield put({
                type: 'setSubmitting',
                payload: true,
            });
            const response = yield call(update, id, data);
            if (response.success) {
                // yield put({
                //     type: 'setDetail',
                //     payload: {
                //         ...data,
                //         id,
                //     },
                // });
                yield put({
                    type: 'setSubmitting',
                    payload: false,
                });
                message.success('更新成功');
                callback && callback();
            } else {
                yield put({
                    type: 'setSubmitting',
                    payload: true,
                });
                message.error(response.msg);
            }
        },
        *indexVideo({ payload: { actressId, videoPage, videoPageSize }, callback = null, }, { call, put }) {
            yield put({
                type: 'setLoading',
                payload: true,
            });
            const response = yield call(indexVideo, videoPage, videoPageSize, actressId);
            if (response.success) {
                yield put({
                    type: 'setVideoList',
                    payload: response.data,
                });
                callback && callback();
            }
        }
    },
    reducers: {
        setLoading(state, { payload }) {
            return {
                ...state,
                loading: !!payload,
            };
        },
        setSubmitting(state, { payload }) {
            return {
                ...state,
                submitting: !!payload,
            };
        },
        setList(state, { payload: { page, data: { list, pagination: { total, }, }, formValue, } }) {
            return {
                ...state,
                page,
                list: list || [],
                total,
                formValue,
                loading: false,
            };
        },
        setDetail(state, { payload }) {
            return {
                ...state,
                detail: payload,
                loading: false,
                submitting: false,
            }
        },
        setVideoList(state, { payload, }) {
            return {
                ...state,
                videoList: payload.list,
                videoTotal: payload.pagination.total,
                loading: false,
            };
        },
    },
};