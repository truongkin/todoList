<template>
    <div>
        <b-container fluid="md" class="mt-3">
            <b-row class="mb-3">
                <b-col cols="6">
                    <b-img
                        class="logo"
                        src="https://icons.iconarchive.com/icons/alecive/flatwoken/256/Apps-Google-Drive-Docs-icon.png"
                        fluid
                        alt="Responsive image"
                    ></b-img>
                    <span>TODO LIST</span>
                </b-col>
                <b-col cols="6">
                    <div class="d-flex justify-content-end">
                        <b-button variant="primary" @click="handelLogOUt"
                            >LogOut</b-button
                        >
                    </div>
                </b-col>
            </b-row>

            <FilterNote />
            <b-button variant="primary" @click="isNoteAddNewActive = true"
                >+ Add Note</b-button
            >
            <ListData />

            <note-add-new :is-note-add-new-active.sync="isNoteAddNewActive" />
        </b-container>
    </div>
</template>

<script>
import FilterNote from "./Filter";
import ListData from "./ListData";
import NoteAddNew from "./note/NoteAddNew";
export default {
    components: {
        FilterNote,
        ListData,
        NoteAddNew
    },
    data() {
        return {
            isNoteAddNewActive: false
        };
    },
    methods: {
        handelLogOUt() {
            this.$store
                    .dispatch("user/logout")
                    .then(res => {
                        this.$toast.open({
                            message: "Success !!",
                            type: "success",
                            position: "top-right",
                            duration: 2000
                        });
                         window.location.reload()
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

<style>
.logo {
    width: 10%;
}
</style>
