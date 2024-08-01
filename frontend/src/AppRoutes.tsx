import { Route, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import CheckEmailPage from "./pages/CheckEmailPage";
import CheckPasswordPage from "./pages/CheckPasswordPage";
import Forgotpassword from "./pages/Forgotpassword";
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import { AuthProvider } from './components/AuthContext'; // Import the context provider
import ViewSchedules from "./pages/ViewSchedules";
import JoinSchedule from "./pages/JoinSchedule";
import RegistrationPage from "./pages/RegistrationPage";
import ManageConferencePage from "./pages/ManageConferencePage";


const AppRoutes = () => {
  return (
    <AuthProvider>
    <Provider store={store}>
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
        
      />
      <Route
        path="/register"
        element={
          <Layout showHero={false}>
            <RegisterPage />
          </Layout>
        }
      />
      <Route path="/email" element={
          <Layout showHero={false}>
            <CheckEmailPage />
          </Layout>
        } />
        <Route path="/password" element={
          <Layout showHero={false}>
            <CheckPasswordPage />
          </Layout>
        } />
        <Route path="/forgot-password" element={
          <Layout showHero={false}>
            <Forgotpassword />
          </Layout>
        } />
        <Route
        path="/view-schedules"
        element={
          <Layout showHero={false}>
            < ViewSchedules/>
          </Layout>
        }
      />
      <Route
        path="/join-schedule"
        element={
          <Layout showHero={false}>
            <JoinSchedule/>
          </Layout>
        }
      />
      <Route
        path="/registrations"
        element={
          <Layout showHero={false}>
            <RegistrationPage/>
          </Layout>
        }
      />
      <Route
        path="/manage-conferences"
        element={
          <Layout showHero={false}>
            <ManageConferencePage/>
          </Layout>
        }
      />
    </Routes>
    
    </Provider>
    </AuthProvider>
  );
};
export default AppRoutes;
