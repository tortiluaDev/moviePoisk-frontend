import { Button, COLORS } from "@/shared";
import { ButtonHTMLAttributes } from "react";
import { Bookmark, Heart } from "lucide-react";
import styles from "./actionBtn.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  btnType: "watchlist" | "favorite";
}

export function ActionMovieButton({ isActive, btnType, ...attributes }: Props) {
  const btnFill = isActive ? COLORS.accent : "";

  return (
    <Button {...attributes} className={styles.actionBtn}>
      {btnType === "watchlist" ? (
        <Bookmark fill={btnFill} />
      ) : (
        <Heart fill={btnFill} />
      )}
    </Button>
  );
}
