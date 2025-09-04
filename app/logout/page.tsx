"use client";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { use } from "react";

export default function Page() {
  signOut();
  //Call an api
  redirect("/login");
}
