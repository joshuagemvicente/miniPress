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
import type { Route } from "./+types/signup";
import { signupSchema } from "~/validations/auth/signupSchema";
import bcrypt from "bcryptjs";
import { prisma } from "~/lib/prisma";
import { useEffect } from "react";
import { SignupForm } from "~/components/forms/auth/SignupForm";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = String(formData.get("username"));
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const parse = signupSchema.safeParse({
    username,
    email,
    password,
  });

  if (!parse.success) {
    const fieldErrors = parse.error.format();
    return data({ fieldErrors }, { status: 400 });
  }

  const { username: uName, email: uEmail, password: uPassword } = parse.data;

  if (!username || !email || !password) {
    return data(
      {
        info: "Please fill all the fields",
      },
      { status: 400 }
    );
  }

  const loweredUsername = uName.toLowerCase().trim();
  const loweredEmail = uEmail.toLowerCase();

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { username: loweredUsername },
        {
          email: loweredEmail,
        },
      ],
    },
  });

  if (existingUser) {
    return data({
      error: "User already exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(uPassword, 10);
  await prisma.user.create({
    data: {
      username: loweredUsername,
      email: loweredEmail,
      password: hashedPassword,
    },
  });

  return data(
    { success: `${loweredUsername} successfully signed up!` },
    { status: 201 }
  );
}

export default function Signup() {
  const actionData = useActionData();

  useEffect(() => {
    if (actionData) {
      if (actionData.error) {
        toast.error(actionData.error);
      } else if (actionData.info) {
        toast.info(actionData.info);
      } else if (actionData.success) {
        toast.success(actionData.success);
      }
    }
  }, [actionData]);

  return <SignupForm fieldErrors={actionData?.fieldErrors} />;
}
