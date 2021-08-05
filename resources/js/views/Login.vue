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
                <h3 class="text-center mt-4 mb-4">Login</h3>
                <b-form>
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
                            type="password"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-button
                        type="button"
                        block
                        variant="primary"
                        @click="handleLogin"
                        >Login</b-button
                    >

                    <hr />
                    <b-button to="/register" block variant="danger"
                        >Register</b-button
                    >
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
                email: "",
                password: ""
            }
        };
    },
    methods: {
        handleLogin() {
            if (!this.form.email || !this.form.password) {
                this.$toast.open({
                    message: "Data cannot be empty !!",
                    type: "error",
                    position: "top-right",
                    duration: 2000
                });
            } else {
                this.$store
                    .dispatch("user/login", {
                        email: this.form.email,
                        password: this.form.password
                    })
                    .then(res => {
                        this.$toast.open({
                            message: "Success !!",
                            type: "success",
                            position: "top-right",
                            duration: 2000
                        });
                        // this.handleLoading()
                        this.$router.push({ name: 'note' })
                    })
                    .catch(err => {
                        this.$toast.open({
                            message: "incorrect account !!",
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

<style>
hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top-color: currentcolor;
    border-top-style: none;
    border-top-width: 0px;
    border-top: 1px solid #eee;
}
</style>
