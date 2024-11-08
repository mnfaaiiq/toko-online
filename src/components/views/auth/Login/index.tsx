import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import Input from "@/components/ui/input";

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
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-3xl mb-3">login</h1>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <div className="w-2/4 p-5 shadow mb-3">
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
      </div>
      <p>
        Don{"'"}t have an account? Sign{" "}
        <Link href={"/auth/register"} className="text-blue-400">
          here
        </Link>
      </p>
    </div>
  );
};

export default LoginView;
