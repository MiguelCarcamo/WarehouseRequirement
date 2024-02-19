import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Grid, IconButton, Container, Snackbar, Dialog, Paper, Typography, CircularProgress, Button, FormControl, InputLabel, Select, MenuItem, Autocomplete } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import BoxData from './BoxData';
import CloseIcon from '@mui/icons-material/Close';
import Poly from '../Components/img/polygon-logo.png';
import axios from 'axios';
import swal from 'sweetalert';


// <BoxData color='#9C9A9A' title='Input' num0={10} num1={20} num2={15} />
// <BoxData color='#04AFEC' title='Process RH' num0={10} num1={20} num2={15} />
// <BoxData color='#1AB467' title='Output' num0={10} num1={20} num2={15} />
const columns1 = [
    { field: 'id', headerName: 'id', width: 50 },
    { field: 'PONumberPPM', headerName: 'PONumberPPM', width: 150 },
    { field: 'StyleNumberPPM', headerName: 'StyleNumberPPM', width: 150 },
    { field: 'StatusWarehouse', headerName: 'StatusWarehouse', width: 150,
        renderCell: (params) => (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 
                    params.value === 'Input' ? '#9C9A9A' : 
                    params.value === 'Process' ? '#04AFEC' : 
                    params.value === 'Output' ? '#1AB467' : '#FF0000',
                color: 'white',
            }}
        >
            {params.value}
        </div>
        ),
    },
    { field: 'SportPPM', headerName: 'SportPPM', width: 180 },
    { field: 'TypePPM', headerName: 'TypePPM', width: 100 },
    { field: 'MOPPM', headerName: 'MOPPM', width: 100 },
    { field: 'OrderQtyPPM', headerName: 'QtyPPM', width: 75 },
    { field: 'Locations', headerName: 'Locations', width: 120 },
    { field: 'UserWarehouseIN', headerName: 'UserWarehouseIN', width: 120 },
    { field: 'DateIN', headerName: 'DateIN', width: 120 },
    { field: 'TurnoIN', headerName: 'TurnoIN', width: 120 },
    { field: 'UserWarehouseOut', headerName: 'UserWarehouseOut', width: 120 },
    { field: 'DateOut', headerName: 'DateOut', width: 120 },
    { field: 'TurnoOut', headerName: 'TurnoOut', width: 120 },
    { field: 'Comments', headerName: 'Comments', width: 375 },
];


function WarehouseSublimated() {
    const qtyTextFieldRef = useRef(null);
    const [DataRows, setDataRows] = useState(null);
    const [DataRowsLocation, setDataRowsLocation] = useState(null);
    const [DataRowsTurno, setDataRowsTurno] = useState(null);
    const [DataRowsRH, setDataRowsRH] = useState(null);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [Location, setLocation] = useState(null);
    const [Turno, setTurno] = useState(null);
    const [RH, setRH] = useState(null);
    const [Mo, setMo] = useState("");
    const [Color, setColor] = useState("");
    const [Sport, setSport] = useState("");
    const [Type, setType] = useState("");
    const [KeyPPM, setKeyPPM] = useState("");
    const [OrderQty, setOrderQty] = useState("");
    const [loading, setLoading] = useState(false);
    const [Separador, setSeparador] = useState("/");
    const [error, setError] = useState("");
    const [loading2, setLoading2] = useState(false);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );

    const GetData = async (url, setGuardar) => {
        const response = await axios(url);
        const data1 = response.data;
        const statusCode = response.status;
        if (statusCode === 200) {
            setGuardar(data1);
        }
    }

    const QueryPPM = async (KeyPPMv) =>  {
        try {
            if(KeyPPMv != ''){
                setLoading(true);
                const nuevoSeparador = await CheckSplit(KeyPPMv);
                setSeparador(nuevoSeparador);
                const requestData = [{"PONumber": KeyPPMv.split(nuevoSeparador)[0],"StyleNumber": KeyPPMv.split(nuevoSeparador)[1]}];
                const x = await axios.post("https://arnpythondev.tegraglobal.com:5010/api/PPMData/FindPPM",requestData,{headers: {"Content-Type": "application/json",},});
                setMo(x.data[0].ManufactureNumber);
                setColor(x.data[0].StyleColorName +' - '+ x.data[0].StyleColorDescription);
                setSport(x.data[0].DivisionName);
                setType(x.data[0].StyleCategoryName);
                setOrderQty(x.data[0].Qty);
            }
        } catch (error) {
            setError("Sorry, failed to download PPM data :(");
            setOpen(true)
           console.log(error); 
        } finally {
            setLoading(false);
        }
    }

    const CheckSplit = async (text) => {
        return new Promise((resolve) => {
            // Simular un proceso asincrónico con setTimeout
            setTimeout(() => {
                if (text.includes('/')) {
                    resolve('/');
                } else {
                    resolve('-');
                }
            }, 1000); // Ejemplo: Simular un segundo de retardo
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.keyCode === 13) {
            QueryPPM(KeyPPM);
            if (qtyTextFieldRef.current) {
                qtyTextFieldRef.current.focus();
            }
        }
    };

    const SaveData = async () => {
        try {
            setLoading2(true);
            if (
                KeyPPM.trim() === "" ||
                Location === null ||
                Turno === null) {
                setError("All fields must be filled out.");
                setOpen(true);
                return;
            }else{
                const requestData = [{"PONumber": KeyPPM.split(Separador)[0],"StyleNumber": KeyPPM.split(Separador)[1]}];
                const x = await axios.post("https://arnpythondev.tegraglobal.com:5010/api/WarehouseSublimated/Find",requestData,{headers: {"Content-Type": "application/json",},});
                if(x.data.length !== 0){
                    swal("Oops...", "Sorry, there is currently a PO entered. Position: " + x.data[0].Locations + " Received Date: " + x.data[0].DateIN + " Received User: " + x.data[0].UserWarehouseIN + " Received Shift: " + x.data[0].TurnoIN , "error");
                }else{
                    const currentDate = new Date(); 
                    const requestData2 = [{ data1 : [
                        {
                            "ID_Warehouse": 0,
                            "ID_Locations": Location.split("-")[0],
                            "ID_Requirements": RH ? RH.split("-")[0] : RH,
                            "UserWarehouseIN": "miguel.carcamo",
                            "DateIN": currentDate,
                            "TurnoIN": Turno.split("-")[0],
                            "UserWarehouseOut": null,
                            "DateOut": null,
                            "TurnoOut": null,
                            "StatusWarehouse": 1,
                            "Comments": "",
                            "PONumberPPM": KeyPPM.split(Separador)[0],
                            "StyleNumberPPM": KeyPPM.split(Separador)[1],
                            "MOPPM": Mo,
                            "OrderQtyPPM": OrderQty,
                            "SportPPM": Sport,
                            "TypePPM": Type
                        }],
                        }
                    ];
                    const y = await axios.post("https://arnpythondev.tegraglobal.com:5010/api/WarehouseSublimated/Add",requestData2,{headers: {"Content-Type": "application/json",},});
                    if(y.data.msj == "Action Performed Correctly"){
                        swal("Good job!", "You clicked the button!", "success");
                        setKeyPPM("");
                        setOpen2(false);
                    }else{
                        swal("Oops...", "Sorry, failed to upload data :(", "error");
                    }
                }
            }
        } catch (error) {
            setError("Error loading data!!!");
            setOpen(true);
        console.log(error); 
        } finally {
            setLoading2(false);
        }
    }

    useEffect(() => {
        const run = async () => {
            try {
                await GetData("https://arnpythondev.tegraglobal.com:5010/api/General/Locations", setDataRowsLocation);
                await GetData("https://arnpythondev.tegraglobal.com:5010/api/General/Turno", setDataRowsTurno);
                await GetData("https://arnpythondev.tegraglobal.com:5010/api/WarehouseSublimated/All", setDataRows);
                await GetData("https://arnpythondev.tegraglobal.com:5010/api/Requirement/All", setDataRowsRH);
                
            } catch (error) {
                console.error('Error en la llamada a UpdateData:', error);
            }
        };
        run();
    }, []);

    useEffect(() => {
        if (KeyPPM === ""){
            setMo("");
            setType("");
            setSport("");
            setOrderQty("");
            setLocation(null);
            setTurno(null);
            setRH(null);
            const run = async () => { 
                try {
                    await GetData("https://arnpythondev.tegraglobal.com:5010/api/WarehouseSublimated/All", setDataRows); 
                } catch (error) {
                    console.error('Error en la llamada a UpdateData:', error);
                }
            };
            run();
        }
    }, [KeyPPM]);
  return (
        <div style={{ height: '75vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{
                    display: 'flex',              
                    alignItems: 'center',        
                    justifyContent: 'flex-end',  
                    width: '100%',
                    height: '15%',
                }}
                xs={12} sm={2}
            >
                <BoxData color='#9C9A9A' title='Input' num0={10} num1={20} num2={15} />
                <BoxData color='#04AFEC' title='Process RH' num0={10} num1={20} num2={15} />
                <BoxData color='#1AB467' title='Output' num0={10} num1={20} num2={15} />
            </Box>
            <Box sx={{ flex: '85%', overflowX: 'auto', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ height: '5%',  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
                    <IconButton onClick={e => setOpen2(true)} variant="contained" aria-label="fingerprint" size="large" color="secondary">
                        <QrCodeScannerIcon />
                    </IconButton>
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
            <Dialog open={open2} onClose={() => setOpen2(false)} fullWidth maxWidth="md" >
                <Container maxWidth="md">
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={error}
                        action={action}
                    />
                    <Paper variant="outlined" sx={{ my: 2, p: { xs: 3, md: 4 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            WarehouseSublimated IN
                        </Typography>
                        <Paper variant="outlined" sx={{ my: 2, p: { xs: 3, md: 4 }}}>
                            <Grid container spacing={3}>
                            <Grid item xs={12} sm={3}>
                                <TextField margin="normal" fullWidth value={KeyPPM} onClick={(e) => setKeyPPM("")} onChange={(e) => setKeyPPM(e.target.value)} onKeyDown={handleKeyDown} id="KeyPPM" label="KeyPPM" name="KeyPPM" />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField margin="normal" disabled value={Mo} fullWidth id="MO" label="MO" name="MO" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField margin="normal" disabled value={Color} fullWidth id="Color" label="Color" name="Color" />
                            </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField margin="normal" disabled value={Sport} fullWidth id="Sport" label="Sport" name="Sport" />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField margin="normal" disabled value={OrderQty} fullWidth id="OrderQty" label="OrderQty" name="OrderQty" />
                                </Grid>
                                <Grid item xs={12} sm={4} style={{ position: 'relative' }}>
                                    <img src={Poly} style={{ width: '100%', height: 60 }} />
                                    {loading && (
                                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <CircularProgress color="inherit" />
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper variant="outlined" sx={{ my: 2, p: { xs: 3, md: 4 } }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Autocomplete
                                        fullWidth
                                        value={Location}
                                        onChange={(event, newValue) => setLocation(newValue)}
                                        options={DataRowsLocation ? DataRowsLocation.map((option) => option.id + '-' + option.Locations) : []}
                                        renderInput={(params) => <TextField {...params} label="Locations" />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Autocomplete
                                        fullWidth
                                        value={Turno}
                                        onChange={(event, newValue) => setTurno(newValue)}
                                        options={DataRowsTurno ? DataRowsTurno.map((option) => option.id + '-' + option.Turno) : []}
                                        renderInput={(params) => <TextField {...params} label="Locations" />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Autocomplete
                                        fullWidth
                                        value={RH}
                                        onChange={(event, newValue) => setRH(newValue)}
                                        options={DataRowsRH ? DataRowsRH.filter(option => option.StatusRequirement === 'Inspection' 
                                                                                && option.PONumberPPM === KeyPPM.split(Separador)[0] 
                                                                                && option.StyleNumberPPM === KeyPPM.split(Separador)[1]
                                                                                ).map((option) => option.id + '-' + option.PONumberPPM + '/' + option.StyleNumberPPM) 
                                                                                : []}
                                        renderInput={(params) => <TextField {...params} label="Requirement" />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Button
                                        onClick={SaveData}
                                        variant="contained"
                                        style={{
                                            position: 'relative',
                                        }}
                                        disabled={loading2}
                                    >
                                        Save
                                        {loading2 && (
                                            <CircularProgress
                                            style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px', // La mitad de la altura del CircularProgress
                                            marginLeft: '-12px', // La mitad de la anchura del CircularProgress
                                            }}
                                            color="inherit"
                                            size={24}
                                        />
                                        )}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Paper>
                </Container>
            </Dialog>
        </div>
  )
}

export default WarehouseSublimated