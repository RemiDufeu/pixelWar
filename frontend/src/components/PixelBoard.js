/* eslint-disable no-console */
import { useCallback, useEffect, useRef, useState } from 'react';

const PixelBoard = ({pixelBoard}) => {
	
    const canvasRef = useRef(null);
    const [posX , setPosX] = useState(null);
    const [posY , setPosY] = useState(null);

    const setPos = (x, y) => {
        setPosX(Math.floor(x / pixelBoard.pixelSize))
        setPosY(Math.floor(y / pixelBoard.pixelSize))
    }

	const initDraw = useCallback((ctx) => {
        const canvas = canvasRef.current;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        pixelBoard.board.forEach((pixel, rowIndex) => {
            drawPixel(ctx,rowIndex, pixel)
        })
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		// tricks to get high resolution canvas
		canvas.width = pixelBoard.width * pixelBoard.pixelSize;
		canvas.height = pixelBoard.height * pixelBoard.pixelSize;
		canvas.style.width = `${pixelBoard.width * pixelBoard.pixelSize}px`;
		canvas.style.height = `${pixelBoard.height * pixelBoard.pixelSize}px`;
		// end tricks
		initDraw(context);
	}, [initDraw]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        initDraw(context);
        (posX !== null && posY !== null) && drawSelecionnedPixel(context, posX, posY);
    }, [posX, posY]);

	useEffect(() => {
        const canvas = canvasRef.current
		const resize = () => {
			console.log('resize');
		};

        const mouseDetect = (e) => {
            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            setPos(x, y)
        };
        
        const mouseExit = () => {
            setPosX(null)
            setPosY(null)
        };

        const mouseDraw = (e) => {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect()
            const x = Math.floor((e.clientX - rect.left) / pixelBoard.pixelSize)
            const y = Math.floor((e.clientY - rect.top) / pixelBoard.pixelSize)
            const context = canvas.getContext('2d')
            console.log(x, y)
            drawPixel(context, x + y * pixelBoard.width , 'red')
        };

		window.addEventListener('resize',resize);
        canvas.addEventListener('mousemove', mouseDetect);
        canvas.addEventListener('mouseout', mouseExit);
        canvas.addEventListener('click', mouseDraw);
            
		
		return () => {
			canvas.removeEventListener('mousemove',mouseDetect);
            canvas.removeEventListener('mouseout', mouseExit);
            canvas.removeEventListener('mouseclick', mouseDraw);
			window.removeEventListener('resize', resize);
		};
	}, []);

    const drawSquare = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'red'
        ctx.fillRect(0, 0, 100, 100)
    }

    const drawSelecionnedPixel = (ctx, x, y) => {
        ctx.strokeStyle = 'red'
        ctx.strokeRect(x * pixelBoard.pixelSize, y * pixelBoard.pixelSize, pixelBoard.pixelSize, pixelBoard.pixelSize);
    }

    const drawPixel = (ctx, indexPx, color) => {
        if(color) {
            let x = (indexPx  % (pixelBoard.width))
            let y = Math.floor(indexPx /pixelBoard.width)
            ctx.fillStyle = color;
            ctx.fillRect(x * pixelBoard.pixelSize, y * pixelBoard.pixelSize, pixelBoard.pixelSize, pixelBoard.pixelSize);
            
        }
    }

	return (
		<div className="canvas">
            <canvas ref={canvasRef}></canvas>
            <button onClick={drawSquare}>Draw Square</button>
            <button onClick={() => initDraw(canvasRef.current.getContext('2d'))}>Draw Pixel</button>
            {(posX != null & posY != null) && <p> x : {posX} y : {posY}</p>}
        </div>
	);
};

export default PixelBoard;