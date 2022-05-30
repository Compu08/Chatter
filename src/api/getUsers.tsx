import client from "../utils/client";

const getUsers = () => client.get("/user");

export default {
  getUsers
};