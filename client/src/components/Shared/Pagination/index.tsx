"use client";
import React from "react";
import { PaginationProps } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./styles/pagination.module.scss";

export default function Pagination({ meta }: PaginationProps) {
  const { total, page, limit } = meta;
  const totalPages = Math.ceil(total / limit);

  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const updateQuery = (newPage: number, newLimit?: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    if (newLimit) params.set("limit", String(newLimit));
    router.push(`?${params.toString()}`);
  };

  const renderPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 8;
    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pages}>
        <button
          className={styles.navBtn}
          onClick={() => updateQuery(1)}
          disabled={page === 1}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            width={20}
            height={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 4V20M19 7.329V16.671C19 17.7367 19 18.2696 18.7815 18.5432C18.5916 18.7812 18.3035 18.9197 17.9989 18.9194C17.6487 18.919 17.2327 18.5861 16.4005 17.9204L10.5617 13.2494C10.0279 12.8223 9.76097 12.6088 9.66433 12.3508C9.5796 12.1246 9.5796 11.8754 9.66433 11.6492C9.76097 11.3912 10.0279 11.1777 10.5617 10.7506L16.4005 6.07961C17.2327 5.41387 17.6487 5.081 17.9989 5.08063C18.3035 5.0803 18.5916 5.21876 18.7815 5.45677C19 5.73045 19 6.2633 19 7.329Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <button
          className={styles.navBtn}
          onClick={() => updateQuery(page - 1)}
          disabled={page === 1}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            width={20}
            height={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.9268 18.8389C13.7351 19.5461 15 18.9721 15 17.8982L15 6.10192C15 5.02797 13.7351 4.454 12.9268 5.1612L6.61617 10.683C5.81935 11.3802 5.81935 12.6198 6.61617 13.317L12.9268 18.8389ZM13.5 17.3472L7.60393 12.1882C7.4901 12.0886 7.4901 11.9115 7.60393 11.8119L13.5 6.65286L13.5 17.3472Z"
              fill="#212121"
            ></path>
          </svg>
        </button>

        {renderPageNumbers().map((p) => (
          <button
            key={p}
            className={`${styles.pageBtn} ${p === page ? styles.active : ""}`}
            onClick={() => updateQuery(p)}
          >
            {p}
          </button>
        ))}

        <button
          className={styles.navBtn}
          onClick={() => updateQuery(page + 1)}
          disabled={page === totalPages}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            width={20}
            height={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0731 18.8389C10.2649 19.5461 9 18.9721 9 17.8982L9 6.10192C9 5.02797 10.2649 4.454 11.0731 5.1612L17.3838 10.683C18.1806 11.3802 18.1806 12.6198 17.3838 13.317L11.0731 18.8389ZM10.5 17.3472L16.396 12.1882C16.5099 12.0886 16.5099 11.9115 16.396 11.8119L10.5 6.65286L10.5 17.3472Z"
              fill="#212121"
            ></path>
          </svg>
        </button>
        <button
          className={styles.navBtn}
          onClick={() => updateQuery(totalPages)}
          disabled={page === totalPages}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            width={20}
            height={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 20V4M5 16.671V7.329C5 6.2633 5 5.73045 5.21846 5.45677C5.40845 5.21876 5.69654 5.0803 6.00108 5.08063C6.35125 5.081 6.76734 5.41387 7.59951 6.07961L13.4383 10.7506C13.9721 11.1777 14.239 11.3912 14.3357 11.6492C14.4204 11.8754 14.4204 12.1246 14.3357 12.3508C14.239 12.6088 13.9721 12.8223 13.4383 13.2494L7.59951 17.9204C6.76734 18.5861 6.35125 18.919 6.00108 18.9194C5.69654 18.9197 5.40845 18.7812 5.21846 18.5432C5 18.2695 5 17.7367 5 16.671Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>

      <select
        className={styles.limitSelector}
        value={limit}
        onChange={(e) => updateQuery(1, parseInt(e.target.value))}
      >
        {[5, 10, 20, 50].map((l) => (
          <option key={l} value={l}>
            {l} / page
          </option>
        ))}
      </select>
    </div>
  );
}
