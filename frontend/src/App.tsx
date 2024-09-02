/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

import BanyanThemePageWithAdmin from "./components/second-innings-banyan-theme-with-admin";
import NewRegistration from "./components/second-innings-new-registration";

import AdminDashboardView from "./components/admin-dashboard-view";
import AssessorDashboard from "./components/assessor-dashboard";
import RevisedCareManagerDashboard from "./components/revised-care-manager-dashboard";
import HomeCareStaffDashboard from "./components/home-care-staff-dashboard";
import FrontDeskDashboard from "./components/second-innings-front-desk-dashboard";
import ShowAllPatient from "./UI/show-all-members";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component

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

          {/* Private routes with role-based access */}
          <Route
            path="admin-dashboard"
            element={
              <PrivateRoute
                component={AdminDashboardView}
                allowedRoles={["Admin"]}
              />
            }
          />
          <Route
            path="assessor-dashboard"
            element={
              <PrivateRoute
                component={AssessorDashboard}
                allowedRoles={["Assessor"]}
              />
            }
          />
          <Route
            path="care-manager-dashboard"
            element={
              <PrivateRoute
                component={RevisedCareManagerDashboard}
                allowedRoles={["Care Manager"]}
              />
            }
          />
          <Route
            path="homecare-dashboard"
            element={
              <PrivateRoute
                component={HomeCareStaffDashboard}
                allowedRoles={["Home Care Staff"]}
              />
            }
          />
          <Route
            path="frontdesk-dashboard"
            element={
              <PrivateRoute
                component={FrontDeskDashboard}
                allowedRoles={["Front Desk"]}
              />
            }
          />
          <Route
            path="patient-new-registration"
            element={<NewRegistration />}
          />
          <Route path="show-all-member" element={<ShowAllPatient />} />
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
