import React from 'react';
import './Image.css'

const Image = ({url, boxes}) => {
    console.log(boxes)
    const arrDiv = boxes.map((box, index) => {
        return <div key={index} className='bounding-box' style={{
            top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol
        }}></div>
    })
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='target-image' alt='' src={url} width='500px' height='auto'/>
                {arrDiv}
            </div>
        </div>
    )
}

export default Image;