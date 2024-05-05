import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toast-notification";

import { pageSize } from "../common/index";

const articleList = (page = 1) => {
  const postData = ref(null);
  const postNo = ref(0);
  const error = ref(null);

  const load = async () => {
    await axios
      .get("/articles", {
        params: { offset: (page - 1) * pageSize, limit: pageSize },
      })
      .then((response) => {
        if (response) {
          postData.value = response.data.articles;
          postNo.value = response.data.articlesCount;
        }
      });
  };

  return { postData, postNo, error, load };
};

const articleDelete = (slug, page) => {
  const postData = ref(null);
  const postNo = ref(0);
  const error = ref(null);

  const load = async () => {
    await axios.delete(`/articles/${slug}`).then((response) => {
      const $toast = useToast({ position: "top-right" });
      if (response) {
        $toast.success("Article successfully deleted.");
        articleList(page);
      }
    });
  };

  return { postData, postNo, error, load };
};

export { articleList, articleDelete };
