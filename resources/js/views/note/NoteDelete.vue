<template>
    <b-modal
        id="modal-delete"
        modal-class="modal-primary"
        size="md"
        centered
        title="Delete note"
        :visible="isNoteDeleteActive"
        @change="val => $emit('update:is-note-delete-active', val)"
        @hide="resetForm()"
    >
        You definitely want to delete ??

        <template #modal-footer="{ hide }">
            <div class="col-12 text-center">
                <b-row>
                    <b-col cols="12" md="6">
                        <b-button variant="primary" @click="handleDelete">
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
        "is-note-delete-active": {
            type: Boolean,
            required: true
        },
        noteData: {
            type: Object,
            required: true
        }
    },

    data() {
        return {};
    },
    methods: {
        resetForm() {},
        handleDelete() {
            this.$store
                .dispatch("note/deleteNote", this.noteData)
                .then(res => {
                    this.$toast.open({
                        message: "Delete Success !!",
                        type: "success",
                        position: "top-right",
                        duration: 2000
                    });
                    this.$emit("update:is-note-delete-active", false);
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
