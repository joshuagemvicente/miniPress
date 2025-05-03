import React from "react";
import CreatePostForm from "~/components/createPost/CreatePostForm";
import { Form, type ActionFunctionArgs } from "react-router";

export default function createPost() {
  return <CreatePostForm />;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  console.log(title + " " + body);
}
