import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Success = () => {
  useEffect(() => {
    toast.success("Order completed successfully!");
  }, []);

  return <div>Order Completed Successfully!</div>;
};

export default Success;
