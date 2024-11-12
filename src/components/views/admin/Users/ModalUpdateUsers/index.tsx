import Input from "@/components/ui/input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import { FormEvent, useState } from "react";

const ModalUpdateUsers = (props: any) => {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    const result = await userServices.updateUser(updatedUser.id, data);
    console.log(result);
    if (result.status === 200) {
      setIsLoading(false);
      setUpdatedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
    } else {
      setIsLoading(false);
    }
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1 className="font-semibold text-xl mb-4">Update User</h1>
      {/* {modalUpdateUser.email && <p>{modalUpdateUser.email}</p>} */}
      <form onSubmit={handleUpdateUser}>
        <Input
          label="Fullname"
          name="fullname"
          placeholder="Eneter Your Fullname"
          type="text"
          defaultValue={updatedUser.fullname}
          disabled
        />

        <Input
          label="Email"
          name="email"
          placeholder="Enter Your Email"
          type="email"
          defaultValue={updatedUser.email}
          disabled
        />

        <Input
          label="Phone"
          name="phone"
          placeholder="Enter Your Phone"
          type="number"
          defaultValue={updatedUser.phone}
          disabled
        />
        <Select
          label="Role"
          name="role"
          defaultValue={updatedUser.role}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
        />
        <button
          type="submit"
          className="bg-zinc-900 p-2 rounded-sm text-white text-lg mt-3"
        >
          Update
        </button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUsers;
