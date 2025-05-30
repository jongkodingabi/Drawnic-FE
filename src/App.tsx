// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Dashboard } from "./pages/Dashboard";
import "./App.css";
import { Routes, Route } from "react-router";
import AddPlayer from "./CRUD/Players/Create";
import PlayersPage from "./pages/PlayersPage";
import TeamsPage from "./pages/TeamsPage";
import Edit from "./CRUD/Players/Edit";
import { Toaster } from "react-hot-toast";
import AddTeam from "./CRUD/Teams/Create";
import EditTeams from "./CRUD/Teams/Edit";
import ProtectedRoute from "./ProtectedRoute";
import LoginForm from "./components/Forms/LoginForm";
// import LandingPage from "./pages/LandingPage";
import DrawPage from "./pages/DrawPage";
import PlayersByTeamPage from "./pages/PlayersByTeams";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        {/* <Route path="/auth" element={<LoginForm />} /> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/players"
          element={
            <ProtectedRoute>
              <PlayersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teams"
          element={
            <ProtectedRoute>
              <TeamsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addPlayers"
          element={
            <ProtectedRoute>
              <AddPlayer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addTeams"
          element={
            <ProtectedRoute>
              <AddTeam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/players/:id/edit"
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Teams/:id/edit"
          element={
            <ProtectedRoute>
              <EditTeams />
            </ProtectedRoute>
          }
        />
        <Route
          path="/drawpage"
          element={
            <ProtectedRoute>
              <DrawPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playersByTeam"
          element={
            <ProtectedRoute>
              <PlayersByTeamPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
