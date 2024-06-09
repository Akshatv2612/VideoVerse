import React from 'react'

function Logo({height, width}) {
    return (
        <div>
            <img width={width} height={height} src="../../public/assets/logo.png" />
        </div>
    )
}

export default Logo