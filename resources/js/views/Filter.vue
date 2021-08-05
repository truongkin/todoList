<template>
    <div>
        <b-form>
            <b-row>
                <b-col cols="2">
                    <b-form-group
                        id="input-group-1"
                        label="ID:"
                        label-for="input-1"
                    >
                        <b-form-input
                            id="input-1"
                            type="email"
                            required
                            v-model="filter.id"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="2">
                    <b-form-group
                        id="input-group-1"
                        label="Name:"
                        label-for="input-1"
                    >
                        <b-form-input
                            id="input-1"
                            type="email"
                            required
                            v-model="filter.name"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="2">
                    <b-form-group
                        id="input-group-1"
                        label="Status:"
                        label-for="input-1"
                    >
                        <b-form-select
                            v-model="filter.status"
                            :options="options"
                        ></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col cols="2">
                    <b-form-group
                        id="input-group-1"
                        label="Date:"
                        label-for="input-1"
                    >
                        <b-form-datepicker
                            id="example-datepicker"
                            v-model="filter.date"
                            :date-format-options="{
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                            }"
                            class="mb-2"
                            placeholder="dd/MM/YY"
                        ></b-form-datepicker>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group
                        id="input-group-1"
                        label=""
                        label-for="input-1"
                    >
                        <b-button
                            variant="primary"
                            class="btn-action"
                            type="button"
                            @click="filerHandle()"
                            >Search</b-button
                        >
                        <b-button
                            variant="success"
                            class="btn-action"
                            type="button"
                            @click="handleExport()"
                            >Export</b-button
                        >
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
import { mapState } from "vuex";
import XLSX from "xlsx";
export default {
    data() {
        return {
            options: [
                { value: "", text: "All" },
                { value: 1, text: "Fisnish" },

                { value: 2, text: "Not Fisnish" }
            ],
            filter: {
                id: "",
                name: "",
                status: "",
                date: ""
            },
            fileName: "Danh sách note",
            formats: ["xlsx", "txt"],
            cellAutoWidth: true,
            selectedFormat: "xlsx",
            autofilter: { ref: "A1:D1" },
            headerTitle: [
                "ID",
                "Name",
                "Status",
                "Date",
            ],
            headerVal: [
                "id",
                "name",
                "status",
                "date"
            ]
        };
    },
    computed: {
        ...mapState({
            filterState: state => state.note.filter,
            listNoteNotPaging: state => state.note.listNoteNotePaging,
        })
    },
    created() {
        this.filter.id = this.filterState.id;
        this.filter.name = this.filterState.name;
        this.filter.status = this.filterState.status;
        this.filter.date = this.filterState.date;
    },
    methods: {
        async filerHandle() {
            await this.$store.commit("note/SET_Filter", this.filter);
            await this.$store.dispatch("note/getNote");
        },
        async handleExport(){
            await this.$store.commit("note/SET_Filter", this.filter);
            await this.$store.dispatch(
                "note/getNoteNotPaging"
            );
            import("@/utils/Export2Excel").then(excel => {
                const list = this.listNoteNotPaging;
                
                const data = this.formatJson(this.headerVal, list);
                excel.export_json_to_excel({
                    header: this.headerTitle,
                    data,
                    filename: this.fileName,
                    autoWidth: this.cellAutoWidth,
                    bookType: this.selectedFormat,
                    autofilter: this.autofilter
                });
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map((v, index) =>
                filterVal.map(j => {
                    if (j === "status") {
                        return this.resolveNoteStatusText(v[j]);
                    }
                    
                    return v[j];
                })
            );
        },
        resolveNoteStatusText(statusId) {
            if (this.options.find(item => item.value == statusId))
                return this.options.find(item => item.value == statusId).text;
            return "Không xác định trạng thái";
        },
    }
};
</script>

<style>
.btn-action {
    margin-top: 30px;
}
</style>
