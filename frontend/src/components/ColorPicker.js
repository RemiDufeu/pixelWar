import './ColorPicker.css'

const colors = [
    '#FF4500', '#FFA800', '#FFD635', '#00A368', '#BE0039', '#FF3881', '#6D001A', '#FFF8B8',
    '#7EED56', '#2450A4', '#3690EA', '#51E9F4', '#00756F', '#009EAA', '#00CCC0', '#94B3FF',
    '#811E9F', '#B44AC0', '#FF99AA', '#9C6926', '#493AC1', '#6A5CFF', '#E4ABFF', '#DE107F',
    '#FFFFFF', '#D4D7D9', '#898D90', '#000000', '#00CC78', '#6D482F', '#FFB470', '#515252'
]

const ColorPicker = ({ colorState, setColor}) => {
     
     return (<div className='colorPicker bg-light'>
        <h3>Choose a color</h3>
        <div className='colors'>
            {colors.map((color) => <ColorBox key={color} color={color} colorState={colorState} setColor={setColor}/>)}
        </div>
     </div>)
}

const ColorBox = ({color, colorState, setColor}) => {
    let border = color == colorState ? "5px solid #eaeaea" : 'none';
    let click = color == colorState ? () => {} : () => setColor(color);
    return(
        <div className='colorBox' key={color} onClick={click} style={{backgroundColor: color, border : border}}></div>
    )
}

export default ColorPicker;