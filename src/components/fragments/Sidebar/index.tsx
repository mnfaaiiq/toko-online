import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type PropTypes = {
  lists: Array<{
    title: string;
    url: string;
    icon: any;
  }>;
};

const Sidebar = (props: PropTypes) => {
  const { lists } = props;
  const { pathname } = useRouter();
  return (
    <div className="bg-zinc-900 text-white p-5 w-[300px] h-screen flex flex-col justify-between">
      <div>
        {" "}
        {/* Sidebar top */}
        <h1 className="font-semibold text-2xl">Admin Panel</h1>
        <div className="mt-5 p-1 flex flex-col">
          {" "}
          {/* Sidebar top list */}
          {lists.map((list, index) => (
            <Link
              key={index}
              href={list.url}
              className={`flex items-center gap-3 mb-3 rounded-sm text-xl hover:bg-white hover:text-black p-2 transition-all ${
                pathname === list.url ? "bg-white text-black" : ""
              }`}
            >
              {/* Lsit item */}
              {list.icon}
              <h2>{list.title}</h2> {/* List item title */}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <button
          type="button"
          className="bg-white p-2 rounded-md text-black w-full text-lg"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
