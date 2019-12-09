import { get, put, } from '@/utils/request';

export async function index(page = 1, pageSize = 30, name = '', sortBy = '') {
    return get(`/server/actress?page=${page}&pageSize=${pageSize}&name=${name}&sortBy=${sortBy}`);
}

export async function show(id) {
    return get(`/server/actress/show/${id}`);
}

export async function update(id, data) {
    return put(`/server/actress/update/${id}`, data);
}
