import {
  AuthProvider,
  QueryProvider,
  TenantProvider,
} from "@gaqno-development/frontcore";
import { Navigate } from "react-router-dom";

export default function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <TenantProvider>
          <Navigate to="/crm/dashboard" replace />
        </TenantProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
