import { addData, retrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

interface User {
  id: string;
  email: string;
  fullname?: string;
  phone?: string;
  password: string; // Pastikan password disertakan dalam tipe
  role?: string;
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    phone: string;
    password: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
  },
  callback: Function
) {
  const data = await retrieveDataByField("users", "email", userData.email);

  if (data.length > 0) {
    callback(false);
  } else {
    if (!userData.role) {
      userData.role = "member";
    }

    // Hash password sebelum menyimpan
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.created_at = new Date();
    userData.updated_at = new Date();
    await addData("users", userData, (result: boolean) => callback(result));
  }
}

export async function signIn(email: string): Promise<User | null> {
  const data = (await retrieveDataByField("users", "email", email)) as User[]; // Tetapkan tipe sebagai User[]

  if (data.length > 0 && data[0].password) {
    // Memastikan password ada
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(
  data: {
    email: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
    password?: string;
  },
  callback: Function
) {
  const user = await retrieveDataByField("users", "email", data.email);
  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = "member";
    data.created_at = new Date();
    data.updated_at = new Date();
    data.password = "";
    await addData("users", data, (result: boolean) => {
      if (result) {
        callback(data);
      }
    });
  }
}
