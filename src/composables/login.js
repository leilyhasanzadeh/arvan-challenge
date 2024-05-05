import { ref } from "vue";
import axios from "axios";

const login = (email, password) => {
  const userData = ref(null);
  const error = ref(null);

  const load = async () => {
    await axios
      .post("/users/login", {
        user: { email, password },
      })
      .then((response) => {
        if (response) userData.value = response.data;
      });
  };

  return { userData, error, load };
};

export default login;
