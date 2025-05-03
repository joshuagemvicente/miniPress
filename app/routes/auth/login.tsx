import { toast } from "sonner";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Form, type ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {}

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
