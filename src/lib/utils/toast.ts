import { toast } from "react-toastify";

export const txToast = {
  success(msg: string) {
    toast.success(msg, {
      position: "top-right",
    });
  },
  error(msg: string) {
    toast.error(msg, {
      position: "top-right",
    });
  },
};
