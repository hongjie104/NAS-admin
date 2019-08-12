import { get } from '@/utils/request';

export async function index(page, pageSize) {
    return get(`/server/video?page=${page}&pageSize=${pageSize}`);
}
