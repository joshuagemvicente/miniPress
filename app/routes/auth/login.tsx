import { toast } from "sonner";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  data,
  Form,
  redirect,
  useActionData,
  type ActionFunctionArgs,
} from "react-router";
import { loginSchema } from "~/validations/auth/loginSchema";
import { prisma } from "~/lib/prisma";
import bcrypt from "bcryptjs";
import { useEffect } from "react";
import { sessionStorage, getSession } from "~/sessions.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = String(formData.get("username"));
  const password = String(formData.get("password"));

  const parsed = loginSchema.safeParse({ username, password });

  if (!parsed.success) {
    const errorMessages = parsed.error.flatten();
    return { errors: errorMessages };
  }

  const { username: uName, password: uPassword } = parsed.data;

  if (!username || !password) {
    return data({ warning: "Please fill all the fields" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      username: uName,
    },
  });

  if (!user) {
    return data({ error: "Invalid username or password" }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(uPassword, user.password);

  if (!isPasswordValid) {
    return data({ error: "Invalid username or password" }, { status: 400 });
  }

  const session = await getSession(request);
  session.set("userId", user.id);

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export default function Login() {
  const actionData = useActionData();

  useEffect(() => {
    if (actionData) {
      if (actionData.error) {
        toast.error(actionData.error);
      } else if (actionData.warning) {
        toast.warning(actionData.warning);
      } else {
        toast.success("Login successful");
      }
    }
  }, [actionData]);

  return (
    <div>
      <Form method="post">
        <div className="space-y-1">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input type="text" name="username" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" />
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}
