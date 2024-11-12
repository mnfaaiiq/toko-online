import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import ModalUpdateUsers from "./ModalUpdateUsers";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import userServices from "@/services/user";
import ModalDeleteUser from "./ModalDeleteUser";

type PropTypes = {
  users: any;
};

const UsersAdminView = (props: PropTypes) => {
  const { users } = props;
  const [updatedUser, setUpdatedUser] = useState<any>({});
  const [usersData, setUsersData] = useState([]);
  const [deletedUser, setDeletedUser] = useState<any>();

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  return (
    <>
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
                {usersData.map((user: any, index: number) => (
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
                          className="bg-sky-500 hover:bg-sky-600 py-2 px-4 rounded-sm text-white text-lg flex items-center gap-1 transition-all"
                          onClick={() => setUpdatedUser(user)}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          type="button"
                          className="bg-red-500 hover:bg-red-600 p-2 rounded-sm text-white text-lg flex items-center gap-1 transition-all py-2 px-4"
                          onClick={() => setDeletedUser(user)}
                        >
                          <MdDelete /> Delete
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
      {Object.keys(updatedUser).length && (
        <ModalUpdateUsers
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
        />
      )}
      {deletedUser && Object.keys(deletedUser).length > 0 && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
        />
      )}
    </>
  );
};

export default UsersAdminView;
