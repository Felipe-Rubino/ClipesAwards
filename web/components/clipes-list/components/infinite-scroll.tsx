"use client";
import { ClipeDTO } from "@/@types/Clipe";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
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
  const { fetchNextPage, hasNextPage, error, isError, isPending } =
    queryResponse;

  const { ref: nextVideoRef, inView: inViewNext } = useInView({
    threshold: 0.1,
    rootMargin: "500px",
  });

  useEffect(() => {
    if (inViewNext) {
      fetchNextPage();
    }
  }, [inViewNext, fetchNextPage]);

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
      {/* <div ref={previousVideoRef} /> */}
      {children}
      {!hasNextPage && !isError && hasNoMorePagesComponent}
      <div ref={nextVideoRef} />
    </>
  );
}
