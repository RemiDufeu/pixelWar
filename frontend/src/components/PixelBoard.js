/* eslint-disable no-console */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormGroup, Input, Label } from 'reactstrap';
import { getPixelBoard } from '../query/pixelboard';

const PixelBoard = ({colorState}) => {

    const params = useParams();
	
    const canvasRef = useRef(null);
    const [pixelW, setPixelW] = useState(40);

    const [posX , setPosX] = useState(null);
    const [posY , setPosY] = useState(null);

    let setPos = (x, y) => {
        setPosX(Math.floor(x / pixelW))
        setPosY(Math.floor(y / pixelW))
    }

    const changePixelW = (e) => {
        setPixelW(parseInt(e.target.value));
    }

    const mouseDetect = (e) => {
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setPos(x, y)
    };

    useEffect(() => {
        const canvas = canvasRef.current
		const resize = () => {
			console.log('resize');
		};
        
        const mouseExit = () => {
            setPosX(null)
            setPosY(null)
        };

		window.addEventListener('resize',resize);
        canvas.addEventListener('mousemove', mouseDetect);
        canvas.addEventListener('mouseout', mouseExit);
        canvas.addEventListener('click', mouseDraw);
            
		
		return () => {
			canvas.removeEventListener('mousemove',mouseDetect);
            canvas.removeEventListener('mouseout', mouseExit);
            canvas.removeEventListener('click', mouseDraw);
			window.removeEventListener('resize', resize);
		};
	}, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.removeEventListener('mousemove',mouseDetect);
        canvas.addEventListener('mousemove', mouseDetect);
        getPixelBoard(params.id).then((pixelBoard) => {
            redrawPixels(pixelBoard,canvas);
        })
    }, [posX, posY, pixelW])

    const redrawPixels = (board, canvas) => {
        const ctx = canvas.getContext('2d');
        canvas.width = board.width * pixelW;
        canvas.height = board.height * pixelW;
        canvas.style.width = `${board.width * pixelW}px`;
		canvas.style.height = `${board.height * pixelW}px`;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        (posX !== null && posY !== null) && drawSelecionnedPixel(ctx);
        board.pixelsView.forEach((element,index) => {
            if(element){
                drawPixel(ctx, index, element, board.width);
            }
        });
    }

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.removeEventListener('click', mouseDraw);
        canvas.addEventListener('click', mouseDraw);
    }, [colorState])



    const mouseDraw = (e) => {
        console.log(colorState);
    };

    const drawSelecionnedPixel = (ctx) => {
        ctx.strokeStyle = colorState
        console.log(posX, posY, pixelW);
        ctx.strokeRect(posX * pixelW, posY * pixelW, pixelW, pixelW);
    }

    const drawPixel = (ctx, indexPx, color,pbw) => {
        if(color) {
            let x = (indexPx  % (pbw))
            let y = Math.floor(indexPx /pbw)
            ctx.fillStyle = color;
            ctx.fillRect(x * pixelW, y * pixelW, pixelW, pixelW);
        }
    }

	return (
        <div>
        <div className="canvas">
            <canvas ref={canvasRef} style={{ border : '2px solid black'}}></canvas>
        </div>
        <div>
            <FormGroup>
                <Label for="pixelSize">
                    Taille d'un pixel {pixelW} px
                </Label>
                <Input name='pixelSize' type="range" min="5" max="50" step="5" aria-label="pixelSize" value={pixelW} onChange={changePixelW} />
            </FormGroup>
            {(posX != null & posY != null) && <p> x : {posX} y : {posY}</p>}
        </div>
        </div>
	);
};

export default PixelBoard;