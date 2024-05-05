<template>
  <p class="loading" v-show="loading">loading...</p>
  <header class="article-header">
    <span class="content-title">{{ slug ? "Edit" : "New" }} Article</span>
  </header>
  <section class="article-form">
    <form class="row g-0" @submit.prevent="handleSubmit">
      <div class="col-9">
        <div class="form-group" :class="{ 'required-group': requiredTitle }">
          <label class="title-label">Title</label>
          <input type="text" class="form-control" v-model="title" />
          <span class="required">Required field</span>
        </div>
        <div class="form-group">
          <label class="description-label">Description</label>
          <input type="text" class="form-control" v-model="description" />
        </div>
        <div class="form-group">
          <label class="body-label">Body</label>
          <textarea class="form-control" v-model="body" />
        </div>
        <button class="submit" :disabled="loading">Submit</button>
      </div>
      <div class="col-3 tags">
        <div class="form-group">
          <label class="tags-label">Tags</label>
          <input
            type="text"
            class="form-control"
            v-model="tagInput"
            @keypress="handleKeyPress"
          />
        </div>
        <article class="tag-list">
          <div class="form-check" v-for="(tag, index) in tags" :key="index">
            <input
              class="form-check-input"
              type="checkbox"
              :value="tag"
              id="flexCheckDefault"
              v-model="tagList"
            />
            <label class="form-check-label" for="flexCheckDefault">
              {{ tag }}
            </label>
          </div>
        </article>
      </div>
    </form>
  </section>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import router from "@/router";
import {
  articleById,
  articlePost,
  articlePut,
} from "../../composables/article";
import { getTagList } from "../../composables/tags";

export default {
  name: "Article",
  props: ["slug"],
  setup({ slug }) {
    const loading = ref(false);
    const requiredTitle = ref(false);
    const title = ref("");
    const description = ref("");
    const body = ref("");
    const tagInput = ref("");
    const tagList = ref([]);
    const tags = ref([]);

    watch(title, async () => {
      if (title.value) requiredTitle.value = false;
      else requiredTitle.value = true;
    });

    onMounted(async () => {
      const { errorTag, tagData, loadTag } = getTagList();

      loading.value = true;
      await loadTag();
      loading.value = false;
      tags.value = tagData.value;

      if (!slug) return;

      const { error, postData, load } = articleById(slug);

      loading.value = true;
      await load();
      loading.value = false;

      title.value = postData.value?.article?.title;
      description.value = postData.value?.article?.description;
      body.value = postData.value?.article?.body;
      tagList.value = postData.value?.article?.tagList;
    });

    const handleSubmit = async () => {
      if (!title.value) requiredTitle.value = true;

      if (title.value) {
        const data = {
          title: title.value,
          description: description.value,
          body: body.value,
          tagList: tagList.value,
        };

        let error, postData, load;

        if (slug) ({ error, postData, load } = articlePut(slug, data));
        else ({ error, postData, load } = articlePost(data));

        loading.value = true;
        await load();
        loading.value = false;

        if (postData) router.push({ name: "ArticleList" });
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        tags.value.push(tagInput.value);
        tagList.value.push(tagInput.value);
        tagInput.value = "";
      }
    };

    return {
      loading,
      title,
      description,
      body,
      tagList,
      requiredTitle,
      tags,
      tagInput,
      handleKeyPress,
      handleSubmit,
    };
  },
};
</script>

<style src="./style.css" scoped></style>
