import Link from "next/link";
import React from "react";

type PropTypes = {
  error?: string;
  title?: string;
  children?: React.ReactNode;
  link: string;
  linkText?: string;
};

const AuthLayout = (props: PropTypes) => {
  const { error, title, children, link, linkText } = props;
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-3xl mb-3">{title}</h1>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <div className="w-2/4 p-5 shadow mb-3">{children}</div>
      <p>
        {linkText}
        <Link href={link} className="text-blue-400">
          here
        </Link>
      </p>
    </div>
  );
};

export default AuthLayout;
