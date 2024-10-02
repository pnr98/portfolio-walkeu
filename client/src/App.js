import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Walk from "./pages/Walk";
import Header from "./components/Header";
import Nav from "./components/Nav";
import styled from "styled-components";
import Calender from "./pages/Calender";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Signup from "./pages/Signup";

const AppConatiner = styled.div`
  width: 100%;
  height: 100vh;
  padding: 15px;
  display: flex;
  gap: 15px;
  background-color: #f2f2f2;

  justify-content: center;
  position: relative; // nav z-index 설정을 위해
`
const MainContainer = styled.div`
  /* flex: 1; */
  display: flex;
  background-color: wheat;
  border-radius: 40px;
  width: 900px;
  display: flex;
  justify-content: center;
`

function App() {
  return (
    <AppConatiner>
      <Nav />
      <MainContainer>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/walk" element={<Walk />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </MainContainer>
      <Header />
    </AppConatiner>
  );
}

export default App;
