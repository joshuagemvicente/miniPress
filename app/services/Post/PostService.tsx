import { prisma } from "~/lib/prisma";

type Post = {
  title: string;
  body: string;
};

export async function createNewPost({ title, body }: Post) {
  const post = await prisma.post.create({
    data: {
      authorId: "1",
      title: title,
      content: body,
    },
  });

  if (!post) {
    return { status: false, message: "Failed to create post." };
  }

  return { status: true, message: "Post success." };
}
