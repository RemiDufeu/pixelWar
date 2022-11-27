import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ColorPicker from "../components/ColorPicker";
import Loading from "../components/Loading";
import PixelBoard from "../components/PixelBoard";
import TopBar from "../components/Topbar";
import { useUser } from "../lib/useUser";
import { getPixelBoard } from "../query/pixelboard";

const BoardPage = () => {
    const [color, setColor] = useState('#FF4500');
    const params = useParams();

    const [loading, user] = useUser();
    const [board, setBoard] = useState(null);

    useEffect(() => {
      getPixelBoard(params.id).then((res) => {
        setBoard(res);
      });
    }, []);



    const pixelBoard = {
        width: 16,
        height: 16,
        pixelSize: 50,
        board : [
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
            '','red','','','blue','','','blue',
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
      return (<>
        <TopBar/>
        <h1>{board.name}</h1>
        <div className="container flexBetween">
            <div>BoardPage color : {color}</div>
          <PixelBoard pixelBoard={pixelBoard} colorState={color}/>
          <ColorPicker colorState={color} setColor={setColor}/>
        </div>
      </>)
}

export default BoardPage