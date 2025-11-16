import styles from "@/app/(private)/profile/profile.module.scss";

interface Props {
  name: string;
  email: string;
}

export function UserInfo({ name, email }: Props) {
  return (
    <div className={styles.user}>
      <div className={styles.avatar} />
      <div>
        <p className={styles.name}>{name}</p>
        <p className={styles.email}>{email}</p>
      </div>
    </div>
  );
}
