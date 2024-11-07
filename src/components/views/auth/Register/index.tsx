import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    setError("");
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      setIsLoading(false);
      form.reset();
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("email is already registered");
      console.log("error");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-3xl mb-3">Register</h1>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <div className="w-2/4 p-5 shadow mb-3">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col my-5">
            <label htmlFor="fullname">Fullname</label>
            <input
              name="fullname"
              id="fullname"
              type="text"
              className="p-3 bg-slate-100 mt-1 rounded-md"
            />
          </div>
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
            <label htmlFor="phone">Phone</label>
            <input
              name="phone"
              id="phone"
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
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p>
        Have an account? Sign in <Link href={"/auth/login"}>her</Link>
      </p>
    </div>
  );
};

export default RegisterView;
