"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/validationSchema";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useAuth } from "@/context/AuthContext";
import styles from "./Auth.module.scss";

export default function AuthPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async () => {
    const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
    const data = await res.json();
    setUser(data.results[0]);
    router.push("/dashboard");
  };

  return (
    <div className={styles.authWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input label="Phone Number" maxLength={11} {...register("phone")} error={errors.phone?.message} />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
