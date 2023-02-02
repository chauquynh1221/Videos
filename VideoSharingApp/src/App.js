import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import { useSelector } from "react-redux";
import Channel from "./pages/Channel";
import { SnackbarProvider} from 'notistack';
import { fetchStart } from "./redux/videoSlice";
import Homecustom from "./pages/Homecustom";
import { BrowserView, MobileView } from 'react-device-detect';

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 20px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setIsDesktop(true);
    }
  }, []);
  return (
    <SnackbarProvider>
       <>
      <BrowserView>
      {isDesktop ?
      <ThemeProvider theme={darkMode ? darkTheme  : lightTheme }>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path=":slug" element={<Homecustom />} />
                  <Route path="search" element={<Search />} />
                  <Route path="myChannel">
                    <Route path=":id" element={<Channel />} />
                  </Route>
                  <Route
                    path="signin"
                    element={currentUser ? <Home type="random"/> : <SignIn />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
     :  <p>This app only works on desktop</p>}
      </BrowserView>
      <MobileView>
      <p>This app only works on desktop</p>
      </MobileView>
    </>
    
    </SnackbarProvider>
  );
}

export default App;
