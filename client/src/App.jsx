import Hero from "./component/Hero";
import Header from "./component/Header";
import Companies from "./component/Companies/Companies";
import Residencies from "./component/residencies/Residencies";

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
    </div>
  );
};

export default App;
