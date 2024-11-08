import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

// Definisikan tipe atau interface untuk pengguna
interface User {
  id: string;
  email: string;
  fullname?: string;
  phone?: string;
  password: string; // Pastikan password disertakan dalam tipe
  role?: string;
}

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  return snapshot.data();
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
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    callback(false);
  } else {
    try {
      if (!userData.role) {
        userData.role = "member";
      }

      // Hash password sebelum menyimpan
      userData.password = await bcrypt.hash(userData.password, 10);
      userData.created_at = new Date();
      userData.updated_at = new Date();
      await addDoc(collection(firestore, "users"), userData);
      callback(true);
    } catch (error) {
      callback(false);
      console.error(error);
    }
  }
}

export async function signIn(email: string): Promise<User | null> {
  const q = query(collection(firestore, "users"), where("email", "==", email));

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as User[]; // Tetapkan tipe sebagai User[]

  if (data.length > 0 && data[0].password) {
    // Memastikan password ada
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(data: any, callback: Function) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const snapshot = await getDocs(q);
  const user = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = "member";
    await addDoc(collection(firestore, "users"), data).then(() => {
      callback(data);
    });
  }
}
