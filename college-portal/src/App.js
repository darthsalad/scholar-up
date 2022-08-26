import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import Load from "./components/Load/Load";
import StudentsTable from "./components/Table/StudentsTable";
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Student = lazy(() => import("./pages/Student/Student"));
const Unverified = lazy(() => import("./pages/verify/unverified"));
const Verified = lazy(() => import("./pages/verify/Verified"));
const PageNotFound = lazy(() => import("./pages/pageNotFound/PageNotFound"));
const Protected = lazy(() => import("./components/Protected/Protected"));
const Stats = lazy(() => import("./pages/Stats/Stats"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Logout = lazy(() => import("./pages/Auth/logout"));
const Home = lazy(() => import("./pages/Home/Home"));
const QRGenerator = lazy(() => import("./pages/QRGenerator/QRGenerator"));

function App() {
  const [colorScheme, setColorScheme] = React.useState(
    localStorage.getItem("colorScheme") || "dark"
  );
  const [primaryColor, setPrimaryColor] = React.useState(
    localStorage.getItem("primaryColor") || "red"
  );

  const toggleColorScheme = (value) => {
    if (!value) {
      localStorage.setItem(
        "colorScheme",
        colorScheme === "dark" ? "light" : "dark"
      );
      setColorScheme(colorScheme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("primaryColor", value);
      setPrimaryColor(value);
    }
  };

  return (
    <MantineProvider
      theme={{ colorScheme, primaryColor, loader: "bars" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider position="top-center" zIndex={2077}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <BrowserRouter>
            <Suspense fallback={<Load></Load>}>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <Protected>
                      <Home />
                    </Protected>
                  }
                />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/Register" element={<Register />} />
                <Route exact path="/logout" element={<Logout />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/student/:id" element={<Student />} />
                <Route
                  exact
                  path="/students/unverified"
                  element={<Unverified />}
                />
                <Route exact path="/students/verified" element={<Verified />} />
                <Route exact path="/stats" element={<Stats></Stats>}></Route>
                <Route
                  exact
                  path="/contact"
                  element={<Contact></Contact>}
                ></Route>
                <Route exact path="/qr" element={<QRGenerator />}></Route>
                <Route exact path="/table" element={<StudentsTable />}></Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ColorSchemeProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
