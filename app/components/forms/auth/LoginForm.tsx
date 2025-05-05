import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Form } from "react-router";
import { useNavigation } from "react-router";
import type { AuthFieldErrors } from "~/types/auth";

interface LoginFormProps {
  fieldErrors: AuthFieldErrors;
}

export function LoginForm({ fieldErrors }: LoginFormProps) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div>
      <Form method="post">
        <div className="space-y-1">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input type="text" name="username" />
            {fieldErrors?.username._errors.map((err, i) => (
              <p key={i} className="text-red-500 text-sm">
                {err}
              </p>
            ))}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" />
            {fieldErrors?.password._errors.map((err, i) => (
              <p key={i} className="text-red-500 text-sm">
                {err}
              </p>
            ))}
          </div>
          <Button disabled={isLoading} className="w-full" type="submit">
            {isLoading ? "Logging in... " : "Login"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
