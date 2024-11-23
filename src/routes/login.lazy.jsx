import React, { useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
export const Route = createLazyFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = () => {
    // Reset errors
    setEmailError(false);
    setPasswordError(false);

    // Simple validation
    if (!email.includes("@")) {
      setEmailError(true);
    }
    if (password.length < 6) {
      setPasswordError(true);
    }
  };

  return (
    <Field label="Email">
      <Input placeholder="me@example.com" />
    </Field>
  );
}
