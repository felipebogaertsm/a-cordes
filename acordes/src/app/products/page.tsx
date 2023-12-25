"use client";

import React from "react";

// Components:
import Loader from "@/components/Loader";

// TRPC:
import { trpc } from "../_trpc/client";

export default function Products() {
  const products = trpc.getProducts.useQuery();

  return (
    <main>
      <h1>Products</h1>

      <div className="my-12">
        {products.isLoading && <Loader size="xl" />}

        <div>{JSON.stringify(products.data)}</div>
      </div>
    </main>
  );
}
