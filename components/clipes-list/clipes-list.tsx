"use client";
import ClipeItem from "../clipe-item/clipe-item";

export default function ClipesList() {
  return (
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      <ClipeItem />
      <ClipeItem />
      <ClipeItem />
      <ClipeItem />
      <ClipeItem />
      <ClipeItem />
      <ClipeItem />
      <ClipeItem />
      <ClipeItem />
    </section>
  );
}
