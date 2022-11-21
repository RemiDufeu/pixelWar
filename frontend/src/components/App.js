import Formsignup from "./Formsignup";
import Formsignin from "./Formsignin";
import { Users } from "./Users";
import PixelBoard from "./PixelBoard";

const App = () => {

  const pixelBoard = {
    width: 8,
    height: 8,
    pixelSize: 20,
    board : [
        '','red','','','blue','','','blue',
        '','red','','','blue','','','blue',
        '','red','','','blue','','','blue',
        '','red','','','blue','','','blue',
        '','red','','','blue','','','blue',
        '','red','','','blue','','','blue',
        '','red','','','blue','','','blue',
        '','red','','','blue','','','blue'
    ],
  };
  return (
    <div className="container">
      <PixelBoard pixelBoard={pixelBoard}/>
    </div>
  );
};
export default App;