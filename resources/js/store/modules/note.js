  
import { getNote, addNote, editNote ,deleteNote ,getNoteNotPaging } from "@/api/note";

const state = {
    listNote: [],
    listNoteNotePaging:[],
    totalPage: "",
    totalRecords: "",
    from: "",
    to: "",
    filter: {
        page: 1,
        limit: 10,
        id: "",
        name: "",
        date: "",
        status: "",
    },
    showLoading: false
};
const mutations = {
    SET_List_Note: (state, listNote) => {
        state.listNote = listNote;
    },
    SET_List_Note_Not_Paging: (state, listNoteNotePaging) => {
        state.listNoteNotePaging = listNoteNotePaging;
    },
    SET_Total_Page: (state, totalPage) => {
        state.totalPage = totalPage;
    },
    // //filter
    SET_Page: (state, page) => {
        state.filter.page = page;
    },
    SET_Limit: (state, limit) => {
        state.filter.limit = limit;
    },
    SET_Total_Records: (state, totalRecords) => {
        state.totalRecords = totalRecords;
    },
    // //end filter
    SET_From: (state, from) => {
        state.from = from;
    },
    SET_To: (state, to) => {
        state.to = to;
    },
    SET_Show_Loading: (state, showLoading) => {
        state.showLoading = !state.showLoading;
    },
    SET_Filter: (state, filter) => {
        state.filter.id = filter.id;
        state.filter.name = filter.name;
        state.filter.status = filter.status;
        state.filter.date = filter.date;
        
    },
};

const actions = {
    getNote({ commit, state }) {
        commit("SET_Show_Loading");
        return new Promise((resolve, reject) => {
            getNote(state.filter)
                .then(response => {
                    const { data } = response;
                    commit("SET_List_Note", data.data);
                    commit("SET_Total_Page", data.last_page);
                    commit("SET_From", data.from);
                    commit("SET_To", data.to);
                    commit("SET_Total_Records", data.total);
                    commit("SET_Page", data.current_page);
                    commit("SET_Limit", Number(data.per_page));
                    commit("SET_Show_Loading");
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    
    addNote({ commit, state, dispatch }, note) {
        return new Promise((resolve, reject) => {
            addNote(note)
                .then(response => {
                    dispatch("getNote", state.filter);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    editNote({ commit, state, dispatch }, note) {
        return new Promise((resolve, reject) => {
            editNote(note)
                .then(response => {
                    dispatch("getNote", state.filter);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    deleteNote({ commit, state, dispatch }, note) {
        return new Promise((resolve, reject) => {
            deleteNote(note)
                .then(response => {
                    dispatch("getNote", state.filter);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    getNoteNotPaging({ commit, state }) {
        return new Promise((resolve, reject) => {
            getNoteNotPaging(state.filter)
                .then(response => {
                    const { data } = response;
                    commit("SET_List_Note_Not_Paging", data);
                   
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};