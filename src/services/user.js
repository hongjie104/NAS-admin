import { get, post } from '@/utils/request';

export async function query() {
    return get('/api/users');
}

export async function queryCurrent() {
    return get('/server//user/currentUser');
}

export async function login(params) {
    return post('/server/login', params);
}