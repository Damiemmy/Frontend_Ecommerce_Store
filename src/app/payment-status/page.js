"use client";
import React, { Suspense } from "react";
import PaymentStatusContent from "@/Components/PaymentStatusContent";

const PaymentStatusPage = () => {
  return (
    <Suspense fallback={<div className="text-white text-center p-10">Loading payment status...</div>}>
      <PaymentStatusContent />
    </Suspense>
  );
};

export default PaymentStatusPage;
