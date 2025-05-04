import { Outlet, type LoaderFunctionArgs, type MetaArgs } from "react-router";
import { Toaster } from "sonner";

export function meta({}: MetaArgs) {
  return [
    { title: "Auth | MiniPress" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

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
