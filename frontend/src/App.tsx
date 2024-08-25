/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

import BanyanThemePageWithAdmin from "./UI/components/second-innings-banyan-theme-with-admin";
import NewRegistration from "./UI/components/second-innings-new-registration";
import BanyanThemePageWithNamaste from "./UI/components/second-innings-banyan-theme-with-namaste";
import AdminDashboardView from "./UI/components/admin-dashboard-view";
import AssessorDashboard from "./UI/components/assessor-dashboard";
import RevisedCareManagerDashboard from "./UI/components/revised-care-manager-dashboard";
import HomeCareStaffDashboard from "./UI/components/home-care-staff-dashboard";
import FrontDeskDashboard from "./UI/components/second-innings-front-desk-dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<BanyanThemePageWithAdmin />} />
          <Route path="/" element={<BanyanThemePageWithAdmin />} />

          <Route path="admin-dashboard" element={<AdminDashboardView />} />
          <Route path="assessor-dashboard" element={<AssessorDashboard />} />
          <Route
            path="care-manager-dashboard"
            element={<RevisedCareManagerDashboard />}
          />
          <Route
            path="homecare-dashboard"
            element={<HomeCareStaffDashboard />}
          />
          <Route path="assessor-dashboard" element={<FrontDeskDashboard />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          closeButton={false}
          style={{
            fontSize: "16px",
            maxWidth: "1000px",
            margin: "0 50px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "black",
          }}
          toastStyle={{
            backgroundColor: "white",
            color: "black",
            padding: "16px 24px",
          }}
        />

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            duration: 5000, // Matches autoClose duration
            style: {
              fontSize: "16px",
              maxWidth: "700px",
              margin: "0 50px",
              padding: "16px 24px",
              backgroundColor: "white",
              color: "black",
            },
            success: {
              duration: 3000, // Specific for success
            },
            error: {
              duration: 5000, // Specific for error
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
