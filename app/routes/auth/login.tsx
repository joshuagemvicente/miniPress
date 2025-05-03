import { toast } from "sonner";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Form } from "react-router";
import type { Route } from "./+types/login";

export async function action({ request }: Route.ActionArgs) {}

export default function Login() {
  return (
    <div>
      <Form method="post">
        <div className="space-y-1">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input name="username" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input name="email" />
          </div>
        </div>
      </Form>
    </div>
  );
}
