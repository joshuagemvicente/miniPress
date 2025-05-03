import type { Route } from "./+types/auth-layout";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Auth | MiniPress" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {}

export default function AuthLayout() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div>
        <Outlet />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
