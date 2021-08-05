<template>
    <b-modal
        id="modal-edit"
        modal-class="modal-primary"
        size="md"
        centered
        title="Edit note"
        :visible="isNoteEditActive"
        @change="val => $emit('update:is-note-edit-active', val)"
        @hide="resetForm()"
    >
        <b-form @submit.prevent="handleSubmit(onSubmit)" ref="addNewUserForm">
            <b-row>
                <!-- username -->
                <b-col cols="12" md="12">
                    <b-form-group label="username">
                        <template v-slot:label>
                            <span class="font-weight-bold text-nowrap">
                                Name
                                <span class="text-danger">(*)</span>
                            </span>
                        </template>

                        <b-form-input
                            name="login-email"
                            placeholder="Enter username"
                            v-model="form.name"
                        />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="12">
                    <b-form-group label="username">
                        <template v-slot:label>
                            <span class="font-weight-bold text-nowrap">
                                Status
                                <span class="text-danger">(*)</span>
                            </span>
                        </template>

                        <b-form-select
                            v-model="form.status"
                            :options="options"
                        ></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="12">
                    <b-form-group label="username">
                        <template v-slot:label>
                            <span class="font-weight-bold text-nowrap">
                                Date
                                <span class="text-danger">(*)</span>
                            </span>
                        </template>

                        <b-form-datepicker
                            id="example-datepicker"
                            v-model="form.date"
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
            </b-row>
        </b-form>

        <template #modal-footer="{ hide }">
            <div class="col-12 text-center">
                <b-row>
                    <b-col cols="12" md="6">
                        <b-button variant="primary" @click="handleEdit"> 
                            Save
                        </b-button>
                    </b-col>
                    <b-col cols="12" md="6">
                        <b-button variant="secondary" @click="hide">
                            Close
                        </b-button>
                    </b-col>
                </b-row>
            </div>
        </template>
    </b-modal>
</template>

<script>
export default {
    props: {
        "is-note-edit-active": {
            type: Boolean,
            required: true
        },
        noteData: {
            type: Object,
            required: true
        }
    },
    watch: {
        noteData: function(val) {
            this.form.id = val.id;
            this.form.name = val.name;
            this.form.status = val.status;
            this.form.date = val.date;
        }
    },
    data() {
        return {
            value: "",
            selected: 1,
            options: [
                { value: 1, text: "Fisnish" },
                { value: 2, text: "Not Fisnish" }
            ],
            form: {
                id: "",
                name: "",
                status: "",
                date: ""
            }
        };
    },
    methods: {
        resetForm() {},
        handleEdit(){
            this.$store
                    .dispatch("note/editNote", this.form)
                    .then(res => {
                        this.$toast.open({
                            message: "Edit Success !!",
                            type: "success",
                            position: "top-right",
                            duration: 2000
                        });
                        this.$emit('update:is-note-edit-active', false)
                    })
                    .catch(err => {
                        this.$toast.open({
                            message: this.$funcGlobal.formatMess(
                                err.response.data.errors
                            ),
                            type: "error",
                            position: "top-right",
                            duration: 2000
                        });
                    });
        }
    }
};
</script>

<style></style>
