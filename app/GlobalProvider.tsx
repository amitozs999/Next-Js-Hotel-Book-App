"use client";
//template used for next auth
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { store } from "@/redux/store";
import { Provider } from "react-redux";


export function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />

      {/* created provider redux store  */}
      <Provider store={store}>       
      <SessionProvider>
        {children}
      </SessionProvider>
      </Provider>
    </>
  );
}
