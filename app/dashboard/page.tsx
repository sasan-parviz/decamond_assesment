"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button/Button";

import styles from "./Dashboard.module.scss";

export default function DashboardPage() {
  const router = useRouter();
  const { user, delUser, loading } = useAuth();

  useEffect(() => {
    console.log("check user here: ", user);
    if (!loading && !user) router.push("/auth");
  }, [user, router]);

  return (
    <div className={styles.container}>
      {user ? (
        <>
          <h1>
            Welcome to the Dashboard, Dear {user.name.first} {user.name.last}
          </h1>
          <span>{user.email}</span>
          <Button onClick={() => delUser()}>Logout</Button>
        </>
      ) : (
        "Loading ..."
      )}
    </div>
  );
}
