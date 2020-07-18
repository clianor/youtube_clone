import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CustomRoute from "./components/common/route";
import { Layout } from "antd";
import NavBar from "./components/base/Navbar";

// // base components
import PageHeader from "./components/base/PageHeader";
import PageFooter from "./components/base/PageFooter";

// // pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import VideoUploadPage from "./pages/video/VideoUploadPage";
import NoMatchPage from "./pages/error/NoMatchPage";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <NavBar collapsed={collapsed} />
        <Layout
          style={{
            minHeight: "100vh",
            marginLeft: collapsed ? 80 : 200,
            transition: "all 0.2s",
            msTransition: "all, 0.2s",
            MozTransition: "all 0.2s",
            WebkitTransition: "all 0.2s",
          }}
        >
          <PageHeader
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
          />
          <Switch>
            <CustomRoute
              exact
              path="/"
              component={LandingPage}
              isAccess={null}
            />
            <CustomRoute
              exact
              path="/login"
              component={LoginPage}
              isAuth={false}
            />
            <CustomRoute
              exact
              path="/register"
              component={RegisterPage}
              isAuth={false}
            />
            <CustomRoute
              exact
              path="/video/upload"
              component={VideoUploadPage}
              isAuth={true}
            />
            <Route component={NoMatchPage} />
          </Switch>
          <PageFooter />
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
