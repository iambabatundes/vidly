import http from "./httpService";
import config from "../config.json";

const endPoint = config.apiUri + "/users";

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
