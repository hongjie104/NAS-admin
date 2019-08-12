import { get } from '@/utils/request';

export async function index(page = 1, pageSize = 30, name = '', sortBy = '') {
    return get(`/server/actress?page=${page}&pageSize=${pageSize}&name=${name}&sortBy=${sortBy}`);
}
