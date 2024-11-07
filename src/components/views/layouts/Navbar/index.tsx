import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="flex items-center justify-end w-full h-14 bg-zinc-900 text-white">
      <button
        onClick={() => (data ? signOut() : signIn())}
        className="p-2 bg-white text-black rounded-sm mr-2"
      >
        {data ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Navbar;
