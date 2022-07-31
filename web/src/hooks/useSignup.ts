import useError from "./useError";

interface Ibody {
  email: string;
  username: string;
  password: string;
}

const useSignup = (body: Ibody) => {
  fetch("http://localhost:8080/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: body.email,
      username: body.username,
      password: body.password,
    }),
  })
    .then((res) => {
      const error: Error | boolean = useError(res);
      if (error) {
        throw error;
      }
      return res.json();
    })
    .then((resData) => {
      console.log(resData);
    })
    .catch((err) => console.log(err));
};

export default useSignup;
