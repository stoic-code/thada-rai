"use client";
import React, { createContext, useContext, ReactNode } from "react";

interface SessionCtxProps {
  session: any;
}

const SessionCtx = createContext<SessionCtxProps | undefined>(undefined);

const SessionProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) => {
  return (
    <SessionCtx.Provider value={{ session }}>{children}</SessionCtx.Provider>
  );
};

const useSession = (): SessionCtxProps => {
  const context = useContext(SessionCtx);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { SessionProvider, useSession };
