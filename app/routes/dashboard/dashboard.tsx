import { Form, type LoaderFunctionArgs, redirect } from "react-router";
import { Button } from "~/components/ui/button";
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
      <Form method="post" action="/logout">
        <Button variant="destructive" type="submit">
          Logout
        </Button>
      </Form>
    </div>
  );
}
