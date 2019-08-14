import { get } from '@/utils/request';

export async function index(page, pageSize, name) {
    return get(`/server/series?page=${page}&pageSize=${pageSize}&name=${name}`);
}

// export async function show(id) {
//     return get(`/server/video/${id}`);
// }
