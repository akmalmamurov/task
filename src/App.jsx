import { Routes, Route, Navigate } from "react-router-dom";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import { Dashboard, Auth } from "@/layouts";

function App() {
  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={<AuthOutlet fallbackPath={"/auth/sign-in"} />}
      >
        <Route path="*" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
      <Route path="/auth/*" element={<Auth />} />
    </Routes>
  );
}

export default App;
