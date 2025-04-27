import Hero from "./component/Hero";
import Header from "./component/Header";
import Companies from "./component/Companies";
import Residencies from "./component/Residencies";
import Value from "./component/Value";
import Contact from "./component/Contact";
import GetStarted from "./component/GetStarted";
import Footer from "./component/Footer";

const App = () => {
  return (
    <div className="relative overflow-x-clip ">
      {/* White Gradient Blur */}
      <div className="absolute top-0 left-0 w-[25rem] h-[25rem] bg-white opacity-20 blur-[90px] rounded-full z-[51]" />

      {/* Main Content */}
      <div className="relative z-[1]">
        <Header />
        <Hero />
      </div>
      <Companies />
      <Residencies />
      <Value/>
      <Contact />
      <GetStarted />
      <Footer/>
    </div>
  );
};

export default App;
