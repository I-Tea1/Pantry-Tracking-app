"use client";
import Navbar from "@/components/Navbar";
import HomePage from "@/components/HomePage";
export default function Home() {
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Navbar />
      <HomePage />
    </>
  );
}
