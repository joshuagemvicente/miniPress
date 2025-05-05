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
import { LoginForm } from "~/components/forms/auth/LoginForm";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = String(formData.get("username"));
  const password = String(formData.get("password"));

  const parse = loginSchema.safeParse({ username, password });

  if (!parse.success) {
    const fieldErrors = parse.error.format();
    return data({ fieldErrors }, { status: 400 });
  }

  const { username: uName, password: uPassword } = parse.data;

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
      }
    }
  }, [actionData]);

  return <LoginForm fieldErrors={actionData?.fieldErrors} />;
}
