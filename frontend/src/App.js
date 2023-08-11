import Intro from "./components/intro"
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import {Skills} from "./components/Skills";
import Technologies from "./components/Technologies";
import Contact from "./components/Contact";
import {About} from "./components/About"
import AboutAPI from "./components/Aboutapi"
import HomeAPI from "./components/homeapi"
import Skillapi from "./components/skillapi"
import ProjectAPI from "./components/projectapi";
import Messages from "./components/messages";
import ContactAPI from "./components/contactapi";
import LoginPage from "./components/loginPage";
function App() {

  return (
    <div id="home">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Intro />} />
          <Route path="about" element={<About/>} />
          <Route path="skills" element={<Skills/>} />
          <Route path="projects" element={<Technologies/>} />
          <Route path="contact" element={<Contact/>} />

          <Route path="api" >
            <Route index element={<HomeAPI />} />
            <Route path="about" element={<AboutAPI/>} />
            <Route path="skills" element={<Skillapi/>} />
            <Route path="projects" element={<ProjectAPI/>} />
            <Route path="contact" element={<ContactAPI/>} />
          </Route>
          <Route path="messages" element={<Messages/>} />
          <Route path="login" element={<LoginPage/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
