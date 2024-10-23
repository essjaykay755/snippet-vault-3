"use client";

import React from "react";
import { AuthProvider } from "../contexts/AuthContext";

const ClientAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ClientAuthProvider;
