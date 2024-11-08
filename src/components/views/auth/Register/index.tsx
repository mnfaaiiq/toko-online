import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Input from "@/components/ui/input";
import authServices from "@/services/auth";
import AuthLayout from "../../layouts/AuthLayout";

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

    const result = await authServices.registerAccount(data);

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
    <AuthLayout
      linkText="Already Have an account? Sign in "
      title="Register"
      link="/auth/login"
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Fullname"
          name="fullname"
          placeholder="Eneter Your Fullname"
          type="text"
        />

        <Input
          label="Email"
          name="email"
          placeholder="Enter Your Email"
          type="email"
        />

        <Input
          label="Phone"
          name="phone"
          placeholder="Enter Your Phone"
          type="number"
        />

        <Input
          label="password"
          name="password"
          placeholder="Enter Your Password"
          type="password"
        />

        <button
          type="submit"
          className="bg-black p-2 rounded-md text-white w-full"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
