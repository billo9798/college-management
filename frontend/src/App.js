import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import StudentsView from "./component/student/StudentsView";
import NavBar from "./component/common/NavBar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import AddStudent from "./component/student/AddStudent";
import EditStudent from "./component/student/EditStudent";
import StudentPofile from "./component/student/StudentPofile";
import HomePage from "./component/home/HomePage";
import ViewIssues from "./component/Issues/ViewIssues";
import { EntryPage } from "./component/common/EntryPage";
import LoginPage from "./component/pages/Login";
import Signup from "./component/pages/Signup";
import IssuePage from "./component/Issues/IssuePage";
import AddIssue from "./component/Issues/AddIssue";

function AppContent() {
    const location = useLocation();
    const hideNavbarRoutes = ["/login", "/signup", "/"];

    return (
        <main className="container mt-5">
            {!hideNavbarRoutes.includes(location.pathname) && <NavBar />}
            <Routes>
                <Route exact path="/" element={<EntryPage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/home" element={<HomePage />} />
                <Route exact path="/view-issues" element={<ViewIssues />} />
                <Route exact path="/add-issue" element={<IssuePage />} />
                <Route exact path="/view-students" element={<StudentsView />} />
                <Route exact path="/add-students" element={<AddStudent />} />
                <Route exact path="/edit-student/:id" element={<EditStudent />} />
                <Route exact path="/student-profile/:id" element={<StudentPofile />} />
            </Routes>
        </main>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
