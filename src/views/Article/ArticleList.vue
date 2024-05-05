<template>
  <p class="loading" v-show="loading">loading...</p>
  <header class="article-header">
    <span class="content-title">All Posts</span>
  </header>
  <section class="article-list">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Tags</th>
          <th scope="col">Excerpt</th>
          <th scope="col">Created</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in postList" :key="post.id">
          <td scope="row">{{ index + 1 }}</td>
          <td>{{ post?.title }}</td>
          <td>{{ post?.author?.username }}</td>
          <td>{{ post?.tagList?.join(", ") }}</td>
          <td>{{ post?.description?.slice(0, 20) }}</td>
          <td>
            {{
              post?.createdAt ? new Date(post?.createdAt).toDateString() : "-"
            }}
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                ...
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <router-link :to="'/dashboard/article-update/' + post.slug"
                    >Edit</router-link
                  >
                </li>
                <li>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="handleRemovePostData(post.slug, index + 1)"
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <button
            class="page-link"
            aria-label="Previous"
            :disabled="paginationStart === 1"
            @click="handlePrevPage"
          >
            <span aria-hidden="true">&lt;</span>
          </button>
        </li>
        <li
          class="page-item"
          v-for="(_, index) in new Array(paginationNo)"
          :key="index"
        >
          <button class="page-link" @click="handlePageContent(index + 1)">
            <span aria-hidden="true">{{ index + paginationStart }}</span>
          </button>
        </li>
        <li class="page-item">
          <button
            class="page-link"
            @click="handleNextPage"
            :disabled="paginationStart + paginationNo >= postCount"
            aria-label="Next"
          >
            <span aria-hidden="true">&gt;</span>
          </button>
        </li>
      </ul>
    </nav>
  </section>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Delete Article
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Are you sure to delete Article?</div>
        <div class="modal-footer">
          <button type="button" class="btn" data-bs-dismiss="modal">No</button>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="handleRemovePost"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import router from "@/router";
import { articleList, articleDelete } from "../../composables/article";
import { pageSize, paginationNo } from "../../common/index";

export default {
  name: "ArticleList",
  setup(props) {
    const loading = ref(false);
    const postList = ref([]);
    const postCount = ref(0);
    const selectedSlug = ref("");
    const selectedPage = ref(0);

    const paginationStart = ref(1);

    onMounted(async () => {
      const { error, postData, postNo, load } = articleList();

      loading.value = true;
      await load();
      loading.value = false;

      if (postData.value) {
        postList.value = postData.value;
        postCount.value = postNo.value;
      }
    });

    const handlePageContent = async (page) => {
      console.debug("page: ", page);
      const { error, postData, postNo, load } = articleList(page);

      loading.value = true;
      await load();
      loading.value = false;

      if (postData.value) {
        postList.value = postData.value;
        postCount.value = postNo.value;
      }
    };

    const handlePrevPage = () => {
      paginationStart.value--;
    };

    const handleNextPage = () => {
      paginationStart.value++;
    };

    const handleRemovePostData = async (slug, page) => {
      selectedSlug.value = slug;
      selectedPage.value = page;
    };

    const handleRemovePost = async () => {
      const { error, load } = articleDelete(
        selectedSlug.value,
        selectedPage.value
      );
      loading.value = true;
      await load();
      loading.value = false;
    };

    return {
      loading,
      postList,
      postCount,
      pageSize,
      paginationNo,
      paginationStart,
      handlePrevPage,
      handleNextPage,
      handlePageContent,
      handleRemovePostData,
      handleRemovePost,
    };
  },
};
</script>

<style src="./style.css" scoped></style>
