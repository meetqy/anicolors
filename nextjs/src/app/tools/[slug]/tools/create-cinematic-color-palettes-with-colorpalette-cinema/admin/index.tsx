"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface AdminWrapperProps {
  onSubmit?: () => void;
  disabled?: boolean;
}

export const AdminWrapper = ({ onSubmit, disabled }: AdminWrapperProps) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  if (!token) {
    return null;
  }

  return (
    <Button
      className="fixed right-2 bottom-2 z-[101]"
      onClick={onSubmit}
      disabled={disabled}
    >
      Submit
    </Button>
  );
};
