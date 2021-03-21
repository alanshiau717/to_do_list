///Used for adding the JWT token to the header for requests requiring access
export default function authHeader() {
  const jwt = localStorage.getItem("user");
  if (jwt != null) {
    return { "x-access-token": JSON.parse(jwt).accessToken };
  }
  return { "x-access-token": null };
}
