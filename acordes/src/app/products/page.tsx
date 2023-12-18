"use client";

import React from "react";

// TRPC:
import { trpc } from "../_trpc/client";

export default function Products() {
  const getProducts = trpc.getProducts.useQuery();

  return (
    <main>
      <h1>Products</h1>
      <div>{JSON.stringify(getProducts.data)}</div>
    </main>
  );
}
