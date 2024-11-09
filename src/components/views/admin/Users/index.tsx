import React from "react";
import AdminLayout from "../../layouts/AdminLayout";

type PropTypes = {
  users: any;
};

const UsersAdminView = (props: PropTypes) => {
  const { users } = props;
  return (
    <AdminLayout>
      {/* Styles.users */}
      <div className="w-full border-spacing-0 border-collapse ">
        {/* Styles.users.table */}
        <h1 className="text-xl font-semibold text-center mb-3">
          User Management
        </h1>
        <div className="relative overflow-x-auto shadow-md border-2 border-black">
          <table className="w-full text-sm text-center">
            <thead className="text-xs text-gray-700 uppercase bg-zinc-950">
              <tr className="text-white p-3 h-10">
                <th>#</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {users.map((user: any, index: number) => (
                <tr
                  key={index}
                  className="text-center p-2 text-lg even:bg-gray-500 even:text-white"
                >
                  <td>{index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td className="p-2">
                    <div className="flex gap-2 items-center justify-center">
                      <button
                        type="button"
                        className="bg-zinc-900 p-2 rounded-sm text-white w-full text-lg"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="bg-zinc-900 p-2 rounded-sm text-white w-full text-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersAdminView;
