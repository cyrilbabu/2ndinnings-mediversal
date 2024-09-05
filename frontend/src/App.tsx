import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

// Import all role-based routes
import AdminRoute from "./routes/Admin";
import AssessorRoute from "./routes/AssesorRoute";
import CareManagerRoute from "./routes/CareManagerRoute";
import HomeCareStaffRoute from "./routes/HomeCareStaffRoute";
import FrontDeskRoute from "./routes/MultiRoleRoutes";

// Import components
import BanyanThemePageWithAdmin from "./components/second-innings-banyan-theme-with-admin";
import NewRegistration from "./components/second-innings-new-registration";
import AdminDashboardView from "./components/admin-dashboard-view";
import AssessorDashboard from "./components/assessor-dashboard";
import RevisedCareManagerDashboard from "./components/revised-care-manager-dashboard";
import HomeCareStaffDashboard from "./components/home-care-staff-dashboard";
import FrontDeskDashboard from "./components/second-innings-front-desk-dashboard";
import ShowAllPatient from "./UI/show-all-members";
import AdminShowAllPatient from "./UI/admin-show-all-member";
import ViewAllPlans from "./components/view-all-plans";
import VitalsRecordingScreen from "./components/home-care-vitals-recording-with-photos";
import StaffRegistration from "./components/staff-registration";
import HomeCareVitalDetails from "./components/home-care-vitail-detail";

import ViewMemberDetails from "./components/second-innings-member-details-with-benefit-tracking";
import IndianGeriatricAssessmentForm from "./components/indian-geriatric-assessment-form";

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

          <Route
            path="admin-dashboard"
            element={
              <AdminRoute>
                <AdminDashboardView />
              </AdminRoute>
            }
          />
          <Route
            path="/admin-dashboard/assign-care-manager"
            element={
              <AdminRoute>
                <AdminShowAllPatient role="Care Manager" />
              </AdminRoute>
            }
          />
          <Route
            path="/admin-dashboard/assign-assessor"
            element={
              <AdminRoute>
                <AdminShowAllPatient role="Assessor" />
              </AdminRoute>
            }
          />
          <Route
            path="/admin-dashboard/assign-home-care-staff"
            element={
              <AdminRoute>
                <AdminShowAllPatient role="Home Care Staff" />
              </AdminRoute>
            }
          />

          <Route
            path="frontdesk-dashboard"
            element={
              <FrontDeskRoute>
                <FrontDeskDashboard />
              </FrontDeskRoute>
            }
          />
          <Route
            path="frontdesk-dashboard/show-all-member"
            element={
              <FrontDeskRoute>
                <ShowAllPatient />
              </FrontDeskRoute>
            }
          />
          <Route
            path="frontdesk-dashboard/member-detail/:id"
            element={
              <FrontDeskRoute>
                <ViewMemberDetails />
              </FrontDeskRoute>
            }
          />
          <Route
            path="frontdesk-dashboard/patient-new-registration"
            element={
              <FrontDeskRoute>
                <NewRegistration />
              </FrontDeskRoute>
            }
          />

          <Route
            path="assessor-dashboard"
            element={
              <AssessorRoute>
                <AssessorDashboard />
              </AssessorRoute>
            }
          />
          <Route
            path="assessor-dashboard/idian-geriatric-assessment-form/:id"
            element={
              <AssessorRoute>
                <IndianGeriatricAssessmentForm />
              </AssessorRoute>
            }
          />

          <Route
            path="care-manager-dashboard"
            element={
              <CareManagerRoute>
                <RevisedCareManagerDashboard />
              </CareManagerRoute>
            }
          />
          <Route
            path="care-manager-dashboard/member-detail/:id"
            element={
              <CareManagerRoute>
                <ViewMemberDetails />
              </CareManagerRoute>
            }
          />

          <Route
            path="homecare-dashboard"
            element={
              <HomeCareStaffRoute>
                <HomeCareStaffDashboard />
              </HomeCareStaffRoute>
            }
          />
          <Route
            path="homecare-dashboard/home-care-vitals/:id"
            element={
              <HomeCareStaffRoute>
                <VitalsRecordingScreen />
              </HomeCareStaffRoute>
            }
          />
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
