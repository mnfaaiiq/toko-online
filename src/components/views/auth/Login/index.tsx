import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import Input from "@/components/ui/input";
import AuthLayout from "../../layouts/AuthLayout";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbakcUrl || "/";
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    setError("");
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or password is incorrect");
      }
    } catch (error) {
      setIsLoading;
    }
  };
  return (
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Don't have an account? Sign up "
    >
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          label="Email"
          placeholder="Enter Email"
          type="email"
        />

        <Input
          label="Password"
          name="password"
          placeholder="Enter Password"
          type="password"
        />

        <button
          type="submit"
          className="bg-slate-900 hover:bg-slate-700 p-2 rounded-md text-white w-full"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      <hr className="mt-5 mb-5" />
      <div className="w-full">
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
          className="bg-green-600 p-2 rounded-md text-white w-full flex justify-center items-center gap-2 hover:bg-green-500 transition-all"
        >
          <FaGoogle />
          Login with Google
        </button>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
