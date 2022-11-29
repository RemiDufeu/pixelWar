import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import ColorPicker from "../components/ColorPicker";
import Loading from "../components/Loading";
import PixelBoard from "../components/PixelBoard";
import TopBar from "../components/Topbar";
import { useUser } from "../lib/useUser";
import { getPixelBoard } from "../query/pixelboard";

const BoardPage = () => {
    const [color, setColor] = useState('#FF4500');
    const params = useParams();
    const navigate = useNavigate();

    const [loading, user] = useUser();
    const [board, setBoard] = useState(null);

    useEffect(() => {
      getPixelBoard(params.id).then((res) => {
        setBoard(res);
      }).catch((error) => {
        navigate("/");
      });
    }, []);

      return (<>
        <TopBar/>
        
        <Container>
          <h1>{board && board.name}</h1>
        </Container>
        <div className="gridMax">
          <PixelBoard colorState={color}/>
          <ColorPicker colorState={color} setColor={setColor}/>
        </div>
      </>);
}

export default BoardPage