import http from "./httpService";

const endPoint = +"/users";

export function register(user) {
  return http.post(endPoint, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
}

export default {
  register,
};
