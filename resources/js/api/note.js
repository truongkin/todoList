import request from "@/utils/request";

export function getNote(filter) {
    return request({
        url: "/note",
        method: "get",
        params: filter
    });
}
export function addNote(data) {
    return request({
        url: "/note",
        method: "post",
        data
    });
}
export function editNote(data) {
    return request({
        url: "/note/" + data.id,
        method: "put",
        data
    });
}
export function deleteNote(data) {
    return request({
        url: "/note/" + data.id,
        method: "delete"
    });
}
export function getNoteNotPaging(filter) {
    return request({
        url: "/note/getNoteNotPaging",
        method: "get",
        params: filter
    });
}

