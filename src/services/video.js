import { get } from '@/utils/request';

export async function index(page, pageSize, actressId, code) {
    return get(`/server/video?page=${page}&pageSize=${pageSize}&actressId=${actressId || ''}&code=${code || ''}`);
}

export async function show(id) {
    return get(`/server/video/show/${id}`);
}
