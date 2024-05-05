import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toast-notification";

const register = (username, email, password) => {
  const userData = ref(null);
  const error = ref(null);

  const load = async () => {
    await axios
      .post("/users", {
        user: { username, email, password },
      })
      .then((response) => {
        const $toast = useToast({ position: "top-right" });

        if (response) {
          userData.value = response;
          $toast.success("User successfully registered.");
        }
      });
  };

  return { userData, error, load };
};

export default register;
