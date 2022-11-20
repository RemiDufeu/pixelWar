import Formsignup from "./Formsignup";
import Formsignin from "./Formsignin";
import { Users } from "./Users";

const App = () => {
  return (
    <div className="container">
      <h1>PixelWar</h1>
      <Formsignin />
      <Formsignup />
      <Users />
    </div>
  );
};
export default App;