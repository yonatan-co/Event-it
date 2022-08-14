const useUpload = async (_e: any, id: string | undefined) => {
  const token = localStorage.getItem("token");
  const files = _e.target.files;
  const formData = new FormData();
  formData.append("image", files[0]);
  fetch("http://localhost:8080/feed/upload?event=" + id, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: "Bearer " + token,
    },
  }).catch((err) => {
    return err;
  });
};

export default useUpload;
