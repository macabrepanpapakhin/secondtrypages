import jwt_decode from "jwt-decode";
export const createOrGetUser = (response) => {
  console.log(response);
  const decoded = jwt_decode(response.credential);
  console.log(decoded);
  try {
    console.log(decoded);
    console.log("decoded");
  } catch (error) {
    console.log(error);
  }
  return decoded;
};
