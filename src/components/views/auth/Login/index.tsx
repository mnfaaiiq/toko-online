import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

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
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-3xl mb-3">login</h1>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <div className="w-2/4 p-5 shadow mb-3">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col my-5">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="text"
              className="p-3 bg-slate-100 mt-1 rounded-md"
            />
          </div>

          <div className="flex flex-col my-5">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className="p-3 bg-slate-100 mt-1 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-black p-2 rounded-md text-white w-full"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
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
