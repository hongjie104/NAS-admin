import { message } from 'antd';
import {
    index,
    show,
    update,
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
            sortBy: '',
            page: 1,
            pageSize: 30,
        },
        submitting: false,
    },
    effects: {
        *index({ payload: { page = 1, pageSize = 30, actressId = '', code = '', sortBy = '' }, callback = null }, { call, put }) {
            const response = yield call(index, page, pageSize, actressId, code, sortBy);
            if (response.success) {
                yield put({
                    type: 'setList',
                    payload: {
                        data: response.data,
                        formValue: {
                            page,
                            pageSize,
                            code,
                            sortBy,
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
                callback && callback(response.data.video);
            }
        },
        *update({ payload: { id, data }, callback = null }, { call, put }) {
            yield put({
                type: 'setSubmitting',
                payload: true,
            });
            const response = yield call(update, id, data);
            if (response.success) {
                message.success('更新成功');
                yield put({
                    type: 'setSubmitting',
                    payload: false,
                });
                callback && callback();
            } else {
                yield put({
                    type: 'setSubmitting',
                    payload: true,
                });
                message.error(response.msg);
            }
        },
    },
    reducers: {
        setSubmitting(state, { payload }) {
            return {
                ...state,
                submitting: !!payload,
            };
        },
        setList(state, { payload: { data: { list, pagination: { total, }, }, formValue, } }) {
            return {
                ...state,
                list: list || [],
                total,
                formValue,
            };
        },
        setDetail(state, { payload }) {
            return {
                ...state,
                detail: payload.video,
                actressList: Array.isArray(payload.actress) ? payload.actress : [],
                series: payload.series || [],
                categoryArr: payload.categoryArr || [],
            };
        },
    },
};