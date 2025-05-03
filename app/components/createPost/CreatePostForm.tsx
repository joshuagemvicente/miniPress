import React from "react";
import Input from "./Input";
import { Form, type ActionFunctionArgs } from "react-router";

export default function CreatePostForm() {
  return (
    <div>
      <Form method="post" action="/createPost">
        <Input label="Tittle" name="title" />
        <Input name="body" placeholder="Enter body.." />
        <button className="outline p-3" type="submit">
          Post
        </button>
      </Form>
    </div>
  );
}
