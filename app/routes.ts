import {
  type RouteConfig,
  index,
  prefix,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("./routes/auth/auth-layout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("signup", "./routes/auth/signup.tsx"),
  ]),
  layout("./routes/dashboard/dashboard-layout.tsx", [
    route("dashboard", "./routes/dashboard/dashboard.tsx"),
  ]),
] satisfies RouteConfig;
