import React, { useState } from 'react';
import { Box, Dialog, Chip, Tooltip } from '@mui/material';
import CountUp from 'react-countup';


function BoxData(props) {

  return (
    <>
        <Box sx={{
            width: 140,
            height: 100,
            backgroundColor: props.color,
            borderRadius: 8,
            border: '1px solid gray',        
            display: 'flex',          
            flexDirection: 'column',
            marginRight: 1,         // Espacio a la derecha
            marginLeft: 1,
            cursor: 'pointer',
        }}>
            {/* Primera parte */}
            <div style={{
                flex: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 24,
            }}>
                {props.num1.toLocaleString()}
            </div>
            {/* Segunda parte */}
            <div style={{
                flex: '0.2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'black',
                color: 'white',
                fontSize: 14,
            }}>
                {props.title}
            </div>

            {/* Tercera parte */}
            <div style={{
                flex: '0.4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 12,
            }}>
                <CountUp end={props.num2} />
            </div>
        </Box>
    </>
    )
}

export default BoxData