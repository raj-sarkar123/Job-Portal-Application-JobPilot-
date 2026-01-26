import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import ThemeLayout from "@/components/ui/ThemeLayout";
import Header from "../components/header";
import Footer from "../components/Footer";
import PageSkeleton from "@/components/PageSkeleton"; // 👈 create/import this
import AuthRedirect from "./AuthRedirect";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <ThemeLayout>
      <main className="min-h-screen flex justify-center">
  <div className="w-full max-w-[1500px] px-4">
    <Header />
    <AuthRedirect /> 
    <Outlet />
  </div>
</main>



      <Footer />
    </ThemeLayout>
  );
};



export default AppLayout;
