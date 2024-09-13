import { Routes, Route, Navigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import React from "react";
import DashboardNavbar from "@/components/navbar/Navbar";
import Sidenav from "@/components/navbar/Sidenav";
import { routes } from "@/routes";
import ProductDetails from "@/pages/public/ProductDetails";
import RecipesDetails from "@/pages/public/RecipesDetails";
import RecipMeal from "@/pages/public/RecipMeal";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav routes={routes} />
      <div className="p-4 ml-[4rem] xl:ml-[24rem]">
        <DashboardNavbar />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>

        <Routes>
          {routes.map(({ layout, pages }) =>
            layout === "dashboard"
              ? pages.map(({ path, element }, index) => (
                  <React.Fragment key={path || index}>
                    <Route path={path} element={element} />
                  </React.Fragment>
                ))
              : null
          )}
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="recipes/:id" element={<RecipesDetails />} />
          <Route path="recipes/meal-type/:id" element={<RecipMeal />} />
          <Route path="*" element={<Navigate to="home" replace />} />
        </Routes>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
