/* eslint-disable no-console */
import {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Alert, FormGroup, Input, Label, Tooltip} from 'reactstrap';
import {getPixelBoard, putPixel} from '../query/pixelboard';
import {getUserPixel} from '../query/pixel'

const PixelBoard = ({colorState}) => {

    const params = useParams();

    const canvasRef = useRef(null);
    const [pixelW, setPixelW] = useState(40);
    const [pixeloldX, setPixeloldX] = useState(null);
    const [pixeloldY, setPixeloldY] = useState(null);
    const [userNom, setUserNom] = useState("");
    const [userPrenom, setUserPrenom] = useState("");
    const [pixelUpdate, setPixelUpdate] = useState("");


    const [posX, setPosX] = useState(null);
    const [posY, setPosY] = useState(null);
    const [error, setError] = useState(null);

    const [pixelBoard, setPixelBoard] = useState(null);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    //const toggle = () => setTooltipOpen(!tooltipOpen);


    const deleteError = () => {
        setError(null);
    }

    let setPos = (x, y) => {
        setPosX(Math.floor(x / pixelW))
        setPosY(Math.floor(y / pixelW))
    }
    let setPosOld = (x, y) => {
        setPixeloldX(x)
        setPixeloldY(y)
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
        if ((posX != pixeloldX) || (posY != pixeloldY)) {
            if (pixelBoard.pixelsView[posX + (posY * pixelBoard.width)] != null) {
                getUserPixel(params.id, posX, posY)
                    .then((res) => {
                        if (res.user !== null) {
                            setUserNom(res.user.nom)
                            setUserPrenom(res.user.prenom)
                        } else {
                            setUserNom("Anonyme")
                            setUserPrenom("Anonyme")
                        }
                        setPixelUpdate(new Date(res.pixel.updatedAt).toLocaleDateString())
                        setTooltipOpen(true)
                    })
            } else {
                setTooltipOpen(false)
                setUserNom("")
                setUserPrenom("")
                setPixelUpdate("")
            }
            setPosOld(posX, posY)
        }
        redrawPixels(pixelBoard, canvas)
    };


    useEffect(() => {
        const canvas = canvasRef.current
        const resize = () => {
            console.log('resize');
        };

        const mouseExit = () => {
            setPosX(null)
            setPosY(null)
            setPixeloldX(null)
            setPixeloldY(null)
        };

        window.addEventListener('resize', resize);
        canvas.addEventListener('mousemove', mouseDetect);
        canvas.addEventListener('mouseout', mouseExit);


        return () => {
            canvas.removeEventListener('mousemove', mouseDetect);
            canvas.removeEventListener('mouseout', mouseExit);
            window.removeEventListener('resize', resize);
        };
    }, [posX, posY, pixelW, pixeloldX, pixeloldY]);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.removeEventListener('mousemove', mouseDetect);
        canvas.addEventListener('mousemove', mouseDetect);
        getPixelBoard(params.id)
            .then((res) => {
                setPixelBoard(res);
                redrawPixels(res, canvas);
            })
    }, [])

    const redrawPixels = (board, canvas) => {
        const ctx = canvas.getContext('2d');
        canvas.width = board.width * pixelW;
        canvas.height = board.height * pixelW;
        canvas.style.width = `${board.width * pixelW}px`;
        canvas.style.height = `${board.height * pixelW}px`;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        (posX !== null && posY !== null) && drawSelecionnedPixel(ctx);
        board.pixelsView.forEach((element, index) => {
            if (element) {
                drawPixel(ctx, index, element, board.width);
            }
        });
    }

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.addEventListener('click', mouseDraw);
        return () => {
            canvas.removeEventListener('click', mouseDraw);
        }
    }, [colorState, posX, posY])


    const mouseDraw = (e) => {
        const canvas = canvasRef.current
        putPixel(params.id, colorState, posX, posY)
            .then((res) => {
                getPixelBoard(params.id)
                    .then((res) => {
                        setPixelBoard(res);
                        redrawPixels(res, canvas);
                    })
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const drawSelecionnedPixel = (ctx) => {
        ctx.strokeStyle = colorState
        ctx.strokeRect(posX * pixelW, posY * pixelW, pixelW, pixelW);
    }

    const drawPixel = (ctx, indexPx, color, pbw) => {
        let x = (indexPx % (pbw))
        let y = Math.floor(indexPx / pbw)
        ctx.fillStyle = color;
        ctx.fillRect(x * pixelW, y * pixelW, pixelW, pixelW);
    }


    return (
        <div style={{overflow: 'scroll', maxHeight: '100vh'}}>
            <Alert color="danger" style={{margin: '100px 20px', position: 'absolute', right: '50%', zIndex: 1}}
                   isOpen={error} toggle={deleteError}>{error}</Alert>
            <FormGroup>
                <Label for="pixelSize">
                    Taille d'un pixel {pixelW} px
                </Label>
                <Input name='pixelSize' type="range" min="5" max="50" step="5" aria-label="pixelSize" value={pixelW}
                       onChange={changePixelW}/>
            </FormGroup>
            <canvas ref={canvasRef} style={{border: '2px solid black'}} id="TooltipExample"></canvas>
            <Tooltip
                isOpen={tooltipOpen}
                target="TooltipExample"
                placement="right"
            >

                Nom: {userNom} <br/>
                Prenom: {userPrenom} <br/>
                Date modif: {pixelUpdate}
            </Tooltip>
        </div>
    );
};

export default PixelBoard;