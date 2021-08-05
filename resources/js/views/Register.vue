<template>
    <div>
        <div
            class="min-vh-100 d-flex justify-content-center align-items-center "
        >
            <div class="shadow p-3 mb-5 bg-body rounded" style="width: 25%">
                <div class="d-flex  justify-content-center mt-6">
                    <b-img
                        class="w-25 h-25"
                        src="https://icons.iconarchive.com/icons/alecive/flatwoken/256/Apps-Google-Drive-Docs-icon.png"
                        fluid
                        alt="Responsive image"
                    ></b-img>
                </div>
                <h3 class="text-center mt-4 mb-4">Register Account</h3>
                <b-form>
                    <b-form-group
                        id="input-group-1"
                        label="Name:"
                        label-for="input-1"
                    >
                        <b-form-input
                            id="input-1"
                            v-model="form.name"
                            type="text"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="input-group-1"
                        label="Email:"
                        label-for="input-1"
                    >
                        <b-form-input
                            id="input-1"
                            v-model="form.email"
                            type="email"
                            required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                        id="input-group-2"
                        label="Password:"
                        label-for="input-2"
                    >
                        <b-form-input
                            id="input-2"
                            v-model="form.password"
                            required
                            type="password"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="input-group-2"
                        label="Confirm Password:"
                        label-for="input-2"
                    >
                        <b-form-input
                            id="input-2"
                            v-model="form.password_confirmation"
                            required
                            type="password"
                        ></b-form-input>
                    </b-form-group>
                    <b-button block variant="primary" type="button" @click="handleReg">Register</b-button>
                    <hr />
                    <p class="text-center m-0">
                        Do you already have an account?
                        <router-link class="text-primary" to="/login"
                            >Login</router-link
                        >
                    </p>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name:"",
                email: "",
                password: "",
                password_confirmation:""
            },
        };
    },
    methods: {
         handleReg() {
            if (!this.form.email || !this.form.password || !this.form.password_confirmation|| !this.form.name) {
                this.$toast.open({
                    message: "Data cannot be empty !!",
                    type: "error",
                    position: "top-right",
                    duration: 2000
                });
            } else {
                this.$store
                    .dispatch("user/reg", {
                        email: this.form.email,
                        password: this.form.password,
                        password_confirmation: this.form.password_confirmation,
                        name: this.form.name,
                    })
                    .then(res => {
                        this.$toast.open({
                            message: "Reg Success !!",
                            type: "success",
                            position: "top-right",
                            duration: 2000
                        });
                        // this.handleLoading()
                        this.$router.push({ name: 'login' })
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
    }
};
</script>

<style></style>
