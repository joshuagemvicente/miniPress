import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("createPost", "routes/createPost.tsx"),
] satisfies RouteConfig;
