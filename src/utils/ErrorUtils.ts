import toast from "react-hot-toast";

export function handleError(error: any): void {
  if (error.data) {
    const response = error.data;
    if (response?.responseMessages && response.responseMessages.length > 0) {
      if (
        response.responseMessages[response.responseMessages.length - 1].message
      ) {
        toast(
          response.responseMessages[response.responseMessages.length - 1]
            .message || ""
        );
      }
    }
  } else {
    toast(error.message);
  }
}
