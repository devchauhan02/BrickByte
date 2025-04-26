import Hero from "./component/Hero";
import Header from "./component/Header";

const App = () => {
  return (
    <div className="relative overflow-x-clip bg-black">
      {/* White Gradient Blur */}
      <div className="absolute top-0 left-0 w-[25rem] h-[25rem] bg-white opacity-20 blur-[90px] rounded-full z-[51]" />

      {/* Main Content */}
      <div className="relative z-[1]">
        <Header />
        <Hero />
      </div>
    </div>
  );
};

export default App;
