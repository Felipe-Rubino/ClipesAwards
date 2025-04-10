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
  const { fetchNextPage, hasNextPage, error, isError, isPending, isSuccess } =
    queryResponse;
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isPending) {
    return pendingComponent;
  }

  if (isError) {
    return (
      <p className="wrapper">{"message" in error ? error.message : error}</p>
    );
  }

  return (
    <>
      {children}
      {!hasNextPage && !isError && hasNoMorePagesComponent}
      <div ref={ref} />
    </>
  );
}
