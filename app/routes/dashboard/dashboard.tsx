import { type LoaderFunctionArgs, redirect } from "react-router";
import { getSession } from "~/sessions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);
  const userId = session.get("userId");

  if (!userId) {
    return redirect("/login");
  }
  return { userId };
}

export default function Dashboard() {
  return (
    <div>
      <div>Dashboard</div>
    </div>
  );
}
