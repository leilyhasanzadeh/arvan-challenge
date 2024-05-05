<template>
  <section class="dashboard-container">
    <header class="dashboard-header w-100">
      <div class="row w-100 g-0">
        <div class="col-6">
          <span class="title">Arvan Challenge</span>
          <span class="welcome">Welcome {{ username }}</span>
        </div>
        <div class="col-6">
          <button type="button" class="btn logout" @click="handleLogout">
            Logout
          </button>
        </div>
      </div>
    </header>
    <main class="row g-0">
      <aside class="col-2">
        <div class="sidebar-content">
          Post
          <ul>
            <li>
              <router-link to="/dashboard/article-list"
                >All Articles</router-link
              >
            </li>
            <li>
              <router-link to="/dashboard/article-new">New Article</router-link>
            </li>
          </ul>
        </div>
      </aside>
      <section class="col-10 content">
        <router-view />
      </section>
    </main>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import router from "@/router";

export default {
  setup(props) {
    const loading = ref(false);
    const username = ref("");

    onMounted(async () => {
      username.value = localStorage.getItem("username");
    });

    const handleLogout = () => {
      console.debug("logout");
      localStorage.clear();
      router.push({ name: "Login" });
    };

    return {
      username,
      handleLogout,
    };
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
