import React from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";
import Student from "./pages/Student/Student";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

function App() {
  const [colorScheme, setColorScheme] = React.useState("light");
  const [primaryColor, setPrimaryColor] = React.useState("red");

  const toggleColorScheme = (value) => {
    if (!value) setColorScheme(colorScheme === "dark" ? "light" : "dark");
    else setPrimaryColor(value);
  };

  return (
    <MantineProvider
      theme={{ colorScheme, primaryColor }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/Register" element={<Register />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/student/:id" element={<Student />} />
            </Routes>
          </BrowserRouter>
        </ColorSchemeProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
