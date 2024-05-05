<template>
  <p class="loading" v-show="loading">loading...</p>
  <div class="login-container">
    <form class="login" @submit.prevent="handleSubmit">
      <h2 class="title">LOGIN</h2>
      <div class="form-group" :class="{ 'required-group': requiredEmail }">
        <label class="email">Email</label>
        <input type="email" class="form-control" v-model="email" />
        <span class="required">Required field</span>
      </div>
      <div class="form-group" :class="{ 'required-group': requiredPassword }">
        <label class="password">Password</label>
        <input type="password" class="form-control" v-model="password" />
        <span class="required">Required field</span>
      </div>
      <button class="submit">Login</button>
      <div>
        <span class="text">Don’t have account?</span>
        <router-link class="register-now" to="/register"
          >Register Now</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import router from "@/router";
import login from "../../composables/login";
import { useToast } from "vue-toast-notification";

export default {
  name: "Login",
  setup() {
    const loading = ref(false);
    const requiredEmail = ref(false);
    const requiredPassword = ref(false);
    const email = ref("");
    const password = ref("");

    const $toast = useToast({ position: "top-right" });

    watch(email, async () => {
      if (email.value) requiredEmail.value = false;
      else requiredEmail.value = true;
    });

    watch(password, async () => {
      if (password.value) requiredPassword.value = false;
      else requiredPassword.value = true;
    });

    const handleSubmit = async () => {
      if (!email.value) requiredEmail.value = true;
      if (!password.value) requiredPassword.value = true;

      if (email.value && password.value) {
        const { error, userData, load } = login(email.value, password.value);

        loading.value = true;
        await load();
        loading.value = false;

        if (userData.value) {
          localStorage.setItem("token", userData.value?.user?.token);
          localStorage.setItem("username", userData.value?.user?.username);
          router.push({ name: "ArticleList" });
        }
      }
    };

    return {
      loading,
      email,
      password,
      requiredEmail,
      requiredPassword,
      handleSubmit,
    };
  },
};
</script>

<style src="./style.css" scoped></style>
