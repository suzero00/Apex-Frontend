import { MainPage } from "@/pages/main/ui/main-page";
import { Routes, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<MainPage />}></Route>
    </Routes>
  );
};
