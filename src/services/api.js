import { stringify } from 'qs';
import { get, post, deleteRequest, put } from '@/utils/request';

export async function queryProjectNotice() {
    return get('/api/project/notice');
}

export async function queryActivities() {
    return get('/api/activities');
}

export async function queryRule(params) {
    return get(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
    return deleteRequest('/api/rule', params);
}

export async function addRule(params) {
    return post('/api/rule', params);
}

export async function updateRule(params = {}) {
    return put(`/api/rule?${stringify(params.query)}`, params.body);
}

export async function fakeSubmitForm(params) {
    return post('/api/forms', params);
}

export async function fakeChartData() {
    return get('/api/fake_chart_data');
}

export async function queryTags() {
    return get('/api/tags');
}

export async function queryBasicProfile(id) {
    return get(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
    return get('/api/profile/advanced');
}

export async function queryFakeList(params) {
    return get(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
    const { count = 5, ...restParams } = params;
    return deleteRequest(`/api/fake_list?count=${count}`, restParams);
}

export async function addFakeList(params) {
    const { count = 5, ...restParams } = params;
    return post(`/api/fake_list?count=${count}`, restParams);
}

export async function updateFakeList(params) {
    const { count = 5, ...restParams } = params;
    return post(`/api/fake_list?count=${count}`, restParams);
}

// export async function fakeAccountLogin(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }

export async function fakeRegister(params) {
    return post('/api/register', params);
}

export async function queryNotices(params = {}) {
    return get(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
    return get(`/api/captcha?mobile=${mobile}`);
}
