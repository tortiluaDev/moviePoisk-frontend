import { ButtonHTMLAttributes } from "react";
import cn from "clsx";
import styles from "./paginationTab.module.scss";
import { Button } from "@/shared";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  currPage: number;
  pageNumber: number;
}

export function PaginationTab({ currPage, pageNumber, ...attributes }: Props) {
  return (
    <Button
      type="button"
      className={cn(styles.pageTab, currPage === pageNumber && styles.active)}
      {...attributes}
    >
      {pageNumber}
    </Button>
  );
}
