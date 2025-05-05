import { Label } from "~/components/ui/label";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useNavigation } from "react-router";
import type { AuthFieldErrors } from "~/types/auth";

interface SignupFormProps {
  fieldErrors: AuthFieldErrors;
}

export function SignupForm({ fieldErrors }: SignupFormProps) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div>
      <Form method="post">
        <div className="space-y-2">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input type="text" name="username" />
            {fieldErrors?.username?._errors.map((err, i) => (
              <p key={i} className="text-sm text-red-500">
                {err}
              </p>
            ))}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" />
            {fieldErrors?.email?._errors.map((err, i) => (
              <p key={i} className="text-sm text-red-500">
                {err}
              </p>
            ))}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" />
            {fieldErrors?.password?._errors.map((err, i) => (
              <p key={i} className="text-sm text-red-500">
                {err}
              </p>
            ))}
          </div>
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? "Signing up..." : "Sign Up"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
