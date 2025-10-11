import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to official landing page
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
};

export default Checkout;
