<template>
  <p class="loading" v-show="loading">loading...</p>
  <div class="register-container">
    <form class="register" @submit.prevent="handleSubmit">
      <h2 class="title">Register</h2>
      <div class="form-group" :class="{ 'required-group': requiredUser }">
        <label class="user">User</label>
        <input type="text" class="form-control" v-model="username" />
        <span class="required">Required field</span>
      </div>
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
      <button class="submit">Register</button>
      <div>
        <span class="text">Already Registered?</span>
        <router-link class="register-now" to="/login">Login</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import register from "../../composables/register";
import { useToast } from "vue-toast-notification";

export default {
  name: "Register",
  setup() {
    const loading = ref(false);
    const requiredUser = ref(false);
    const requiredEmail = ref(false);
    const requiredPassword = ref(false);
    const username = ref("");
    const email = ref("");
    const password = ref("");

    watch(username, async () => {
      if (username.value) requiredUser.value = false;
      else requiredUser.value = true;
    });

    watch(email, async () => {
      if (email.value) requiredEmail.value = false;
      else requiredEmail.value = true;
    });

    watch(password, async () => {
      if (password.value) requiredPassword.value = false;
      else requiredPassword.value = true;
    });

    const handleSubmit = async () => {
      if (!username.value) requiredUser.value = true;
      if (!email.value) requiredEmail.value = true;
      if (!password.value) requiredPassword.value = true;

      if (username.value && email.value && password.value) {
        const { error, load } = register(
          username.value,
          email.value,
          password.value
        );

        loading.value = true;
        await load();
        loading.value = false;
      }
    };

    return {
      loading,
      username,
      email,
      password,
      requiredUser,
      requiredEmail,
      requiredPassword,
      handleSubmit,
    };
  },
};
</script>

<style src="./style.css" scoped></style>
