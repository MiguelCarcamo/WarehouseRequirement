import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import BoxData from './BoxData';
import axios from 'axios';

const columns1 = [
    { field: 'id', headerName: 'id', width: 50 },
    { field: 'PONumberPPM', headerName: 'PONumberPPM', width: 150 },
    { field: 'StyleNumberPPM', headerName: 'StyleNumberPPM', width: 150 },
    { field: 'SportPPM', headerName: 'SportPPM', width: 180 },
    { field: 'TypePPM', headerName: 'TypePPM', width: 100 },
    { field: 'MOPPM', headerName: 'MOPPM', width: 100 },
    { field: 'OrderQtyPPM', headerName: 'QtyPPM', width: 75 },
    { field: 'StatusRequirement', headerName: 'StatusRequirement', width: 150,
        renderCell: (params) => (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 
                    params.value === 'New' ? '#9c9a9a' : 
                    params.value === 'Inspection' ? '#8DBF20' : 
                    params.value === 'BodegaIn' ? '#3B7DE7' : 
                    params.value === 'Plotter' ? '#6940A3' : 
                    params.value === 'Sublimado' ? '#04AFEC' : 
                    params.value === 'BodegaOn' ? '#FFB000' : 
                    params.value === 'Complete' ? '#1AB467' : '#FF0000',
                color: 'white',
            }}
        >
            {params.value}
        </div>
        ),
    },
    { field: 'CantRequirement', headerName: 'Qty', width: 50 },
    { field: 'RequirementType', headerName: 'RequirementType', width: 90 },
    { field: 'AreaRequirement', headerName: 'AreaRequirement', width: 90 },
    { field: 'PartRequirement', headerName: 'PartRequirement', width: 75 },
    { field: 'SizeRequirement', headerName: 'SizeRequirement', width: 75 },
    { field: 'Comments', headerName: 'Comments', width: 375 },
];

function RequirementData() {
    const [DataRows, setDataRows] = useState(null);

    const GetData = async () => {
        const response = await axios("https://arnpythondev.tegraglobal.com:5010/api/Requirement/All");
        const data1 = response.data;
        const statusCode = response.status;
        if (statusCode === 200) {
            setDataRows(data1);
        }
    }

    useEffect(() => {
        const run = async () =>
            await GetData();
        run();
    }, []);
    return (
        <div style={{ height: '75vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{
                    display: 'flex',              
                    alignItems: 'center',        
                    justifyContent: 'center',  
                    width: '100%',
                    height: '15%',
                }}
                xs={12} sm={2}
            >
                <BoxData color='#9c9a9a' title='New Requirement' num0={10} num1={20} num2={15} />
                <BoxData color='#8DBF20' title='Inspection' num0={10} num1={20} num2={15} />
                <BoxData color='#3B7DE7' title='BodegaIn' num0={10} num1={20} num2={15} />
                <BoxData color='#6940A3' title='Plotter' num0={10} num1={20} num2={15} />
                <BoxData color='#04AFEC' title='Sublimado' num0={10} num1={20} num2={15} />
                <BoxData color='#FFB000' title='BodegaOn' num0={10} num1={20} num2={15} />
                <BoxData color='#1AB467' title='Complete' num0={10} num1={20} num2={15} />
                <BoxData color='#FF0000' title='Deleted' num0={10} num1={20} num2={15} />
            </Box>
            <Box sx={{ flex: '85%', overflowX: 'auto', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ height: '5%',  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
                    <div style={{ display: 'inline-flex' }}>
                        <Typography></Typography>
                    </div>
                </Box>
                <Box sx={{ flex: 1 }}>
                    {DataRows?
                        <DataGrid 
                            rows={DataRows}
                            columns={columns1}
                            density="compact"
                            components={{ Toolbar: GridToolbar }}
                        />
                    : false}
                </Box>
            </Box>
        </div>
    )
}

export default RequirementData