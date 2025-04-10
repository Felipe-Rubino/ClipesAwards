"use client";
import { ClipeDTO } from "@/@types/Clipe";
import { UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  queryResponse: UseInfiniteQueryResult<InfiniteData<ClipeDTO, unknown>, Error>;
  pendingComponent: React.ReactNode;
  hasNoMorePagesComponent: React.ReactNode;
  children: React.ReactNode;
}
export default function InfiniteScroll({
  queryResponse,
  pendingComponent,
  hasNoMorePagesComponent,
  children,
}: Props) {
  const { fetchNextPage, status, hasNextPage } = queryResponse;
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (status === "pending") {
    return pendingComponent;
  }

  return (
    <>
      {children}
      {!hasNextPage && hasNoMorePagesComponent}
      <div ref={ref} />
    </>
  );
}
