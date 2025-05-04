import {
  Outlet,
  redirect,
  type LoaderFunctionArgs,
  type MetaArgs,
} from "react-router";
import { Toaster } from "sonner";
import { getSession } from "~/sessions.server";
import { getUserById } from "~/user.server";
import { sessionStorage } from "~/sessions.server";

export function meta({}: MetaArgs) {
  return [
    { title: "Dashboard | MiniPress" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request);
  const userId = session.get("userId");

  if (!userId || typeof userId !== "string") {
    throw redirect("/login");
  }

  const user = await getUserById(userId);

  if (!user) {
    return redirect("/login", {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(session),
      },
    });
  }
};

export default function DashboardLayout() {
  return (
    <main className="">
      <div>
        <Outlet />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
