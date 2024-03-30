
import "./App.css";
import Home from "./pages/home";

function App() {

  return (
    <div className="App flex justify-around  items-center bg-gray-100">
      {/* <div className="flex justify-center relative w-full  h-screen overflow-y-auto bg-white  md:w-3/6 border-2 border-black shadow-cyan-500/50"> */}
        <Home></Home> 
    {/* </div> */}
    </div>
  );
}

export default App;
