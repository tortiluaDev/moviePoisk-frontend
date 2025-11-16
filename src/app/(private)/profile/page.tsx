import styles from "./profile.module.scss";
import { LogoutButton } from "@/features";
import { User } from "@/widgets";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Profile() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) redirect("/login");
  // верифицировать токен еще, в идеале

  return (
    <div className={styles.profile}>
      <h2>Your profile</h2>
      <User />
      <LogoutButton className={styles.logout} />
    </div>
  );
}
