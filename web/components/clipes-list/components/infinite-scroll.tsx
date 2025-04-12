"use client";
import { ClipeDTO } from "@/@types/Clipe";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";

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
  const { hasNextPage, error, isError, isPending } = queryResponse;

  if (isPending) {
    return pendingComponent;
  }

  if (isError) {
    return (
      <p className="wrapper">{"message" in error ? error.message : error}</p>
    );
  }

  return (
    <div>
      {children}
      {!hasNextPage && !isError && hasNoMorePagesComponent}
    </div>
  );
}
