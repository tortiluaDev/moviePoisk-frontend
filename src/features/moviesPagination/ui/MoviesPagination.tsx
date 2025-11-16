"use client";
import { Button, PaginationTab, usePaginationMoveToPage } from "@/shared";
import styles from "./pagination.module.scss";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { usePagesContext } from "@/features/moviesPagination";
import { useSearchParams } from "next/navigation";
import { transformPageNumber } from "@/features/moviesPagination/model/transformPageNumber";

export function MoviesPagination() {
  const lastPage = 50;
  const pageNumInTheTab = Number(useSearchParams().toString().slice(5));
  const moveToPage = usePaginationMoveToPage(lastPage);
  const { currPage } = usePagesContext();

  const pageNumber = transformPageNumber(pageNumInTheTab, lastPage);

  return (
    <div className={styles.pagination}>
      <Button
        className={styles.arrow}
        onClick={() => moveToPage("back")}
        data-testid="backBtn"
      >
        <ArrowBigLeft />
      </Button>
      <PaginationTab
        currPage={currPage}
        pageNumber={pageNumber}
        onClick={() => moveToPage(pageNumber)}
      />
      <PaginationTab
        currPage={currPage}
        pageNumber={pageNumber + 1}
        onClick={() => moveToPage(pageNumber + 1)}
      />
      {pageNumber === 1 ? (
        <div>...</div>
      ) : (
        <PaginationTab
          currPage={currPage}
          pageNumber={1}
          onClick={() => moveToPage(1)}
        />
      )}
      <PaginationTab
        currPage={currPage}
        pageNumber={lastPage - 1}
        onClick={() => moveToPage(lastPage - 1)}
      />
      <PaginationTab
        currPage={currPage}
        pageNumber={lastPage}
        onClick={() => moveToPage(lastPage)}
      />
      <Button
        className={styles.arrow}
        onClick={() => moveToPage("forward")}
        data-testid="forwardBtn"
      >
        <ArrowBigRight />
      </Button>
    </div>
  );
}
