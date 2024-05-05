import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toast-notification";

import { pageSize } from "../common/index";

const getTagList = (page = 1) => {
  const tagData = ref([]);
  const errorTag = ref(null);

  const loadTag = async () => {
    await axios.get("/tags").then((response) => {
      if (response) {
        tagData.value = response.data.tags;
      }
    });
  };

  return { tagData, errorTag, loadTag };
};

// const tagPost = (data) => {
//   const postData = ref(false);
//   const postNo = ref(0);
//   const error = ref(null);

//   const load = async () => {
//     await axios.post(`/tags`, { article: data }).then((response) => {
//       const $toast = useToast({ position: "top-right" });
//       if (response) {
//         $toast.success("Well done! Article created successfuly.");
//         postData.value = true;
//       }
//     });
//   };

//   return { postData, postNo, error, load };
// };

export { getTagList };
