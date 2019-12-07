import { index, show } from '@/services/actress';
import { index as indexVideo } from '@/services/video';

export default {
    namespace: 'actress',
    state: {
        list: [],
        total: 0,
        detail: null,
        videoList: [],
        videoTotal: 0,
        formValue: {
            name: '',
            sortBy: 'score-desc',
        },
        loading: false,
    },
    effects: {
        *index({ payload: { page, pageSize, name, sortBy }, callback = null }, { call, put }) {
            yield put({
                type: 'setLoading',
                payload: true,
            });
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
        *show({ payload: { id, videoPage, videoPageSize, }, callback = null }, { call, put }) {
            yield put({
                type: 'setLoading',
                payload: true,
            });
            let response = yield call(show, id);
            if (response.success) {
                const actressDetailData = response.data;
                response = yield call(indexVideo, videoPage, videoPageSize, id);
                if (response.success) {
                    const videoIndexData = response.data;
                    yield put({
                        type: 'setDetail',
                        payload: {
                            actressDetailData,
                            videoIndexData,
                        },
                    });
                    callback && callback();
                }
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
        setList(state, { payload: { data: { list, pagination: { total, }, }, formValue, } }) {
            return {
                ...state,
                list: list || [],
                total,
                formValue,
                loading: false,
            };
        },
        setDetail(state, { payload: { actressDetailData, videoIndexData, } }) {
            return {
                ...state,
                detail: actressDetailData,
                videoList: videoIndexData.list,
                videoTotal: videoIndexData.pagination.total,
                loading: false,
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