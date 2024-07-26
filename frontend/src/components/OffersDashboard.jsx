import { z } from "zod";
import DynamicForm from "./DynamicFormDialog";
import Loading from "./Loading";
import DynamicTable from "./DynamicTable";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export function OffersDashboard() {
  const [query, setQuery] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setQuery({ owner_id: user.id });
    }
  }, [user]);
  const columns = [
    { header: "User Email", accessor: "user.email" },
    { header: "Offer price", accessor: "amount" },
    { header: "Product Image", accessor: "product.image", isImage: true },
    { header: "Product Name", accessor: "product.productName" },
    { header: "Product Price", accessor: "product.price" },
    { header: "Status", accessor: "status" },
    { header: "Expired At", accessor: "expiredAt", isTimestamp: true },
  ];

  const fieldDetails = [
    { label: "User Full Name", accessor: "user.fullName" },
    { label: "User Email", accessor: "user.email" },
    { label: "Offer price", accessor: "amount" },
    { label: "Product Image", accessor: "product.image", isImage: true },
    { label: "Product Name", accessor: "product.productName" },
    { label: "Product Price", accessor: "product.price" },
    { label: "Product Quantity", accessor: "product.quantity" },
    { label: "Status", accessor: "status" },
    { label: "Created At", accessor: "createdAt", isTimestamp: true },
    { label: "Expired At", accessor: "expiredAt", isTimestamp: true },
  ]

  return (
    <DynamicTable
      columns={columns}
      title={"Offers"}
      desc={`Lorem ipsum dolor sit amet consectetur adipisicing elit.`}
      url="/offers"
      query={query}
      fieldDetails={fieldDetails}
      isConfirmed={true}
    />

  );
}
