import React, { useEffect, useRef } from 'react'

const PreviewBoard = ({pixelBoard, width}) => {


    const canvasRef = useRef(null);

    const drawPixel = (ctx, indexPx, color,pbw,pixelW) => {
        let x = (indexPx  % (pbw))
        let y = Math.floor(indexPx /pbw)
        ctx.fillStyle = color;
        ctx.fillRect(x * pixelW, y * pixelW, pixelW, pixelW);
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d');
        const pixelW = width/pixelBoard.width;
        canvas.width = width;
        canvas.height = width;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${width}px`;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pixelBoard.pixelsView.forEach((element,index) => {
            if(element){
                drawPixel(ctx, index, element, pixelBoard.width,pixelW);
            }
        });
    }, [pixelBoard,width])


    return (
        <canvas ref={canvasRef} style={{margin : '10px 0'}}>   
        </canvas>
    )
}

export default PreviewBoard
