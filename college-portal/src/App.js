import React from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";
import Student from "./pages/Student/Student";
import Unverified from "./pages/verify/unverified";
import Verified from "./pages/Student/Verified";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Protected from "./components/Protected/Protected";
import Stats from "./pages/Stats/Stats";

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
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/student/:id" element={<Student />} />
              <Route
                exact
                path="/students/unverified"
                element={<Unverified />}
              />
              <Route exact path="/students/verified" element={<Verified />} />
              <Route exact path="/stats" element={<Stats></Stats>}></Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </ColorSchemeProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
