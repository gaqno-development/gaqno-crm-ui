import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

// Lazy load pages for shell integration
const OverviewPage = lazy(() => import("./pages/dashboard/OverviewPage"));
const LeadsPage = lazy(() => import("./pages/sales/LeadsPage"));
const DealsPage = lazy(() => import("./pages/sales/DealsPage"));
const ContactsPage = lazy(() => import("./pages/customers/ContactsPage"));
const InteractionHistoryPage = lazy(() => import("./pages/customers/InteractionHistoryPage"));

export const crmRoutes = [
  {
    path: "dashboard",
    index: true,
    element: <OverviewPage />,
  },
  {
    path: "sales/leads",
    element: <LeadsPage />,
  },
  {
    path: "sales/deals",
    element: <DealsPage />,
  },
  {
    path: "customers/contacts",
    element: <ContactsPage />,
  },
  {
    path: "customers/interaction-history",
    element: <InteractionHistoryPage />,
  },
  {
    path: "",
    element: <Navigate to="dashboard" replace />,
  }
];
