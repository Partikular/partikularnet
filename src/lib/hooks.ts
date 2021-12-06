import { db } from "../lib/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

export const useUserData = () => {
  const [user] = useAuthState(getAuth());
  const [uid, setUid] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = db.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUid(doc.data()?.uid);
      });
    } else {
      setUid(null);
    }
    return unsubscribe;
  }, [user]);
  return { user, uid };
};
