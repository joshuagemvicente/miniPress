import React from "react";
import CreatePostForm from "~/components/createPost/CreatePostForm";
import { Form, type ActionFunctionArgs } from "react-router";
import { prisma } from "~/lib/prisma";
import { createNewPost } from "~/services/Post/PostService";

export default function createPost() {
  return <CreatePostForm />;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  if (!title || !body) {
    console.log("All fields are reqired.");
  }

  const createPost = await createNewPost({ title, body });

  console.log(title + " " + body);
}
