import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";

function App() {
  return (
    <div className="App" style={{width:"100vw",maxWidth:"1500px"}}>
      <Navbar/>
      <Admin/>
    </div>
  );
}

export default App;
