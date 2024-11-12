import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import React from "react";
import { MdDelete } from "react-icons/md";

const ModalDeleteUser = (props: any) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const session: any = useSession();

  const handleDelete = async () => {
    userServices.deleteUser(deletedUser.id, session.data?.accessToken);
    setDeletedUser({});
    const { data } = await userServices.getAllUsers();
    setUsersData(data.data);
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <div className="flex flex-col items-center gap-5">
        <h1 className="font-semibold text-xl mb-4 text-center">
          Are You Sure?
        </h1>
        <button
          type="button"
          onClick={() => handleDelete()}
          className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-sm text-white text-lg flex items-center gap-1 transition-all py-2 px-4"
        >
          <MdDelete /> Delete
        </button>
      </div>
    </Modal>
  );
};

export default ModalDeleteUser;
