import { useState } from "react";
import ColorPicker from "../components/ColorPicker";
import PixelBoard from "../components/PixelBoard";

const BoardPage = () => {
    const [color, setColor] = useState('#FF4500');

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
      return (
        <div className="container flexBetween">
            <div>BoardPage color : {color}</div>
          <PixelBoard pixelBoard={pixelBoard} colorState={color}/>
          <ColorPicker colorState={color} setColor={setColor}/>
        </div>
    )
}

export default BoardPage