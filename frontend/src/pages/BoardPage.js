import { useEffect, useState } from "react";
import ColorPicker from "../components/ColorPicker";
import Loading from "../components/Loading";
import PixelBoard from "../components/PixelBoard";
import TopBar from "../components/Topbar";
import { useRequireAuth } from "../lib/useRequireAuth";

const BoardPage = () => {
    const [color, setColor] = useState('#FF4500');

    const loading = useRequireAuth();

    if (loading) {
        return <Loading />;
    }


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
        <TopBar></TopBar>
        <div className="container flexBetween">
            <div>BoardPage color : {color}</div>
          <PixelBoard pixelBoard={pixelBoard} colorState={color}/>
          <ColorPicker colorState={color} setColor={setColor}/>
        </div>
      </>)
}

export default BoardPage