<template>
    <div class="mt-3">
        <note-edit
            :is-note-edit-active.sync="isNoteEditActive"
            :note-data="noteCurent"
        />
        <note-delete
            :is-note-delete-active.sync="isNoteDeleteActive"
            :note-data="noteCurent"
        />
        <b-overlay :show="showLoading" rounded="sm" spinner-variant="primary">
            <b-table
                :bordered="true"
                hover
                :fields="tableColumns"
                :items="listNote"
            >
                <template #cell(status)="data">
                    
                   {{ resolveUserStatusText(data.item.status) }}
                </template>
                <template #cell(actions)="data">
                    <div class="text-center">
                        <b-button
                            variant="warning"
                            @click="renderEdit(data.item)"
                            >Edit</b-button
                        >
                        <b-button
                            variant="danger"
                            @click="confirmDelete(data.item)"
                            >Delete</b-button
                        >
                    </div>
                </template>
            </b-table>
        </b-overlay>
        <div class="mx-2 mb-2">
            <b-row>
                <b-col
                    cols="12"
                    sm="6"
                    class="d-flex align-items-center justify-content-center justify-content-sm-start"
                >
                    <!-- <v-select
                        v-model="limit" 
                        :options="perPageOptions"
                        :clearable="false"
                        class="per-page-selector d-inline-block mx-50"
                    /> -->
                    <b-form-select
                        class="w-25"
                        v-model="limit"
                        :options="perPageOptions"
                    ></b-form-select>
                    <span class="text-muted">
                        {{ from }} - {{ to }} của {{ totalRecords }} tài
                        khoản</span
                    >
                </b-col>
                <!-- Pagination -->
                <b-col
                    cols="12"
                    sm="6"
                    class="d-flex align-items-center justify-content-center justify-content-sm-end"
                >
                    <b-pagination
                        v-model="page"
                        :total-rows="totalPage"
                        per-page="1"
                        first-number
                        last-number
                        class="mb-0 mt-1 mt-sm-0"
                        prev-class="prev-item"
                        next-class="next-item"
                    >
                        <!-- <template #prev-text>
                            <feather-icon icon="ChevronLeftIcon" size="18" />
                        </template>
                        <template #next-text>
                            <feather-icon icon="ChevronRightIcon" size="18" />
                        </template> -->
                    </b-pagination>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import NoteEdit from "./note/NoteEdit";
import NoteDelete from "./note/NoteDelete";
import { mapState } from "vuex";
export default {
    components: {
        NoteEdit,
        NoteDelete
    },
    data() {
        return {
            perPageOptions: [10, 25, 50, 100],
            tableColumns: [
                { key: "id", label: "ID" },
                { key: "name", label: "Name", class: "ClassName" },
                { key: "status", label: "Status" },
                { key: "date", label: "Date" },
                { key: "actions", label: "Action", class: "nameOfTheClass" }
            ],
            noteCurent: {},
            isNoteEditActive: false,
            isNoteDeleteActive: false,
            optionStatus: [
                {
                    id: "1",
                    name: "Fisnish"
                },
                {
                    id: "2",
                    name: "Not Fisnish"
                }
            ],
        };
    },
    computed: {
        ...mapState({
            listNote: state => state.note.listNote,
            totalPage: state => state.note.totalPage,
            totalRecords: state => state.note.totalRecords,
            from: state => state.note.from,
            to: state => state.note.to,
            showLoading: state => state.note.showLoading
        }),
        page: {
            get() {
                return this.$store.state.note.filter.page;
            },
            async set(value) {
                await this.$store.commit("note/SET_Page", value);
                await this.$store.dispatch("note/getNote");
            }
        },
        limit: {
            get() {
                return this.$store.state.note.filter.limit;
            },
            set(value) {
                this.$store.commit("note/SET_Limit", value);
                this.$store.dispatch("note/getNote");
            }
        }
    },
    methods: {
        renderEdit(note) {
            this.noteCurent = note;
            this.isNoteEditActive = true;
        },
        confirmDelete(note) {
            this.noteCurent = note;
            this.isNoteDeleteActive = true;
        },
        resolveUserStatusText(statusId) {
            if (this.optionStatus.find(item => item.id == statusId))
                return this.optionStatus.find(item => item.id == statusId).name;
            return "Không xác định trạng thái";
        },
    },
    async created() {
        await this.$store.dispatch("note/getNote");
    }
};
</script>

<style>
.nameOfTheClass {
    max-width: 90px;
}
</style>
