import React, { useState, useEffect, useRef } from 'react';
import { Grid, Container, Typography, TextField, Paper, Autocomplete, CircularProgress, Snackbar , IconButton, Select, FormControl,  MenuItem, Badge, Dialog, Tab} from '@mui/material';
import { Box , Button  } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import CloseIcon from '@mui/icons-material/Close';
import Poly from '../Components/img/polygon-logo.png';
import DrawIcon from '@mui/icons-material/Draw';
import axios from 'axios';
import swal from 'sweetalert';
// Bloque de codigo para el camvas
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "./styles.css";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ImgTest from '../Components/ImgTest';

const columns = [
    { field: 'PartNumber', headerName: 'PartNumber', width: 350 },
    { field: 'CategoryName', headerName: 'Category', width: 80,
    renderCell: (params) => (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#E8E2FE',
                color: 'black',
            }}
        >
            {params.value}
        </div>
        ),
    },
    { field: 'BodyPart', headerName: 'BodyPart', width: 200 },
    { field: 'UnitName', headerName: 'Unit', width: 80 },
    { field: 'QuantityOnHand', headerName: 'QtyOnHand', width: 100 },
    { field: 'QuantityRequired', headerName: 'QtyRequired', width: 75 },
];

function RequirementNew() {
    const qtyTextFieldRef = useRef(null);
    const [Proces, setProces] = useState(null);
    const [Proces2, setProces2] = useState(null);
    const [DataProces, setDataProces] = useState(false);
    const [DataCode, setDataCode] = useState(false);
    const [DataPPM, setDataPPM] = useState(false);
    const [KeyPPM, setKeyPPM] = useState("");
    const [RequirementType, setRequirementType] = useState(1);
    const [RequirementCant, setRequirementCant] = useState("");
    const [RequirementSize, setRequirementSize] = useState("");
    const [RequirementPart, setRequirementPart] = useState("");
    const [RequirementUser, setRequirementUser] = useState("");
    const [RequirementComments, setRequirementComments] = useState("");
    const [Mo, setMo] = useState("");
    const [Color, setColor] = useState("");
    const [Sport, setSport] = useState("");
    const [Type, setType] = useState("");
    const [OrderQty, setOrderQty] = useState("");
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(true);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [error, setError] = useState("");
    const [Separador, setSeparador] = useState("/");
    const [DataRows, setDataRows] = useState(null);
    const [formData, setFormData] = useState([]);
    const [value, setValue] = useState("1");
    const [ModalPartNumber, setModalPartNumber] = useState(false)

    const [datosDelHijo, setDatosDelHijo] = useState(false);
    const [Imgif, setImgif] = useState(false);

    const obtenerDatosDelHijo = (datos) => {
        setDatosDelHijo(datos);
    };

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

    const UpdateData = async (url1, setGuardar) =>  {
        try {
            const data = await axios(url1);
            const data1 = await data.data;
            setGuardar(data1);
        } catch (error) {
           console.log(error); 
        }
    }

    const getImg = async (style) =>  {
        const x = await axios("https://arnpythondev.tegraglobal.com:5010/api/SendImage/"+style+".png");
        return x.status;
    }

    const QueryPPM = async (KeyPPMv) =>  {
        try {
            if(KeyPPMv != ''){
                setLoading(true);
                const nuevoSeparador = await CheckSplit(KeyPPMv);
                setSeparador(nuevoSeparador);
                const requestData = [{"PONumber": KeyPPMv.split(nuevoSeparador)[0],"StyleNumber": KeyPPMv.split(nuevoSeparador)[1]}];
                const x = await axios.post("https://arnpythondev.tegraglobal.com:5010/api/PPMData/FindPPM",requestData,{headers: {"Content-Type": "application/json",},});
                setDataRows(x.data);
                setMo(x.data[0].ManufactureNumber);
                setColor(x.data[0].StyleColorName +' - '+ x.data[0].StyleColorDescription);
                setSport(x.data[0].DivisionName);
                setType(x.data[0].StyleCategoryName);
                setOrderQty(x.data[0].Qty);
                try {
                    const vimg = await getImg(KeyPPMv.split(nuevoSeparador)[1]);
                    if(vimg === 200){
                        setImgif(true)
                    }
                } catch (error) {
                    setError("Sorry, failed to download image not found :(");
                    setOpen(true);
                    setImgif(false);
                    console.log(error); 
                }
            }
        } catch (error) {
            setError("Sorry, failed to download PPM data :(");
            setOpen(true)
            console.log(error); 
        } finally {
            setLoading(false);
        }
    }

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
                Proces === null ||
                Proces2 === null ||
                RequirementComments.trim() === "") {
                setError("All fields must be filled out.");
                setOpen(true);
                return;
            }else{
                const requestData = [{"PONumber": KeyPPM.split(Separador)[0],"StyleNumber": KeyPPM.split(Separador)[1]}];
                const x = await axios.post("https://arnpythondev.tegraglobal.com:5010/api/Requirement/Find",requestData,{headers: {"Content-Type": "application/json",},});
                if(x.data.length !== 0){
                    swal("Oops...", "Sorry, There is currently a pending HR #"+x.data[0].id , "error");
                }else{
                    const requestData2 = [{ data1 : [
                        {
                            "ID_Requirement": 0,
                            "ID_Area": 2,
                            "PONumberPPM": KeyPPM.split(Separador)[0],
                            "StyleNumberPPM": KeyPPM.split(Separador)[1],
                            "MOPPM": Mo,
                            "OrderQtyPPM": OrderQty,
                            "SportPPM": Sport,
                            "TypePPM": Type,
                            "Color1PPM": Color,
                            "Color2PPM": "",
                            "RequirementType": RequirementType,
                            "ID_AreaRequirement": Proces.split('-')[0],
                            "CantRequirement": RequirementCant,
                            "PartRequirement": RequirementPart,
                            "SizeRequirement": RequirementSize,
                            "UserRequirement": "miguel.carcamo",
                            "StatusRequirement": 1,
                            "Comments": RequirementComments
                        }],
                        data2 : formData,
                        data3 : datosDelHijo ? datosDelHijo : []
                        }
                    ];
                    const y = await axios.post("https://arnpythondev.tegraglobal.com:5010/api/Requirement/Add",requestData2,{headers: {"Content-Type": "application/json",},});
                    if(y.data.msj == "Action Performed Correctly"){
                        swal("Good job!", "You clicked the button!", "success");
                        setKeyPPM("");
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

    const handleInputChange = (text, index, fieldName) => {
        const newData = [...formData];
        newData[index] = {
          ...newData[index],
          [fieldName]: fieldName === 'ID_Error' ? text.split("-")[0] : text,
        };
        setFormData(newData);
        if (fieldName === "CantRequirement") {
            const totalQty = newData.reduce((accumulator, item) => {
                return accumulator + (parseInt(item.Qty) || 0);
            }, 0);
            setRequirementCant(totalQty);
        }
    };

    useEffect(() => {
        const run = async () => {
            try {
                await UpdateData("https://arnpythondev.tegraglobal.com:5010/api/General/Area", setDataProces);
                await UpdateData("https://arnpythondev.tegraglobal.com:5010/api/CodeError/All", setDataCode);
            } catch (error) {
                console.error('Error en la llamada a UpdateData:', error);
            }
        };
        run();
    }, []);

    useEffect(() => {
        if(ModalPartNumber && DataRows){
            console.log(DataRows);
            if(!DataPPM){
                const run = async () => {
                    await UpdateData("https://arnpythondev.tegraglobal.com:5010/api/PPMData/FindPPMPartNumber/" + DataRows[0].ManufactureID, setDataPPM);
                };
                run();
            }
        }
    }, [ModalPartNumber]);

    useEffect(() => {
        if (KeyPPM === ""){
            setMo("");
            setColor("");
            setSport("");
            setOrderQty("");
            setRequirementType(1);
            setRequirementCant("");
            setRequirementSize("");
            setRequirementPart("");
            setRequirementComments("");
            setDataRows(null);
            setDataPPM(false);
            setDatosDelHijo(false);
            setProces(null);
            setProces2(null);
        }
    }, [KeyPPM]);

    useEffect(() => {
        if (DataRows) {
            const newData = DataRows.flatMap((rowData, index) => [
                {
                    indice: index,
                    ID_Error: null, 
                    GarmentSize: rowData.GarmentSize,
                    RequestCount: rowData.RequestCount,
                    NumbersRequest: 'null',
                    Qty: 0
                }
            ]);
      
          setFormData(newData);
        }
    }, [DataRows]);

    useEffect(() => {   
        if (datosDelHijo) {
            const newData = datosDelHijo.objects.map((objeto, index) => {
                const regist = objeto.text.split("/");
                return {
                    indice: index,
                    ID_Error: regist[0], 
                    GarmentSize: regist[1], 
                    RequestCount: regist[2], 
                    NumbersRequest: regist[3] ? regist[3] : 'null', 
                    Qty: 0
                };
            });
    
            const totalQty = newData.reduce((accumulator, item) => {
                return accumulator + (parseInt(item.RequestCount) || 0);
            }, 0);
            
            setRequirementCant(totalQty);
            setFormData(newData);
        }
    }, [datosDelHijo]);
      
    return (
        <div style={{ height: '100%', width: '100%' }}>
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
                    New Requirement 
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
                            <img onClick={(e)=>DataRows?setModalPartNumber(true):false} src={Poly} style={{ width: '100%', height: 60 }} />
                            {loading && (
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <CircularProgress color="inherit" />
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
              {DataRows?
                <Paper variant="outlined" sx={{ my: 2, p: { xs: 3, md: 4 } }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                            <InputLabel id="RequirementType">RequirementType</InputLabel>
                            <Select
                                    labelId="RequirementType"
                                    label="RequirementType"
                                    value={RequirementType}
                                    onChange={(event) => setRequirementType(event.target.value)}
                                >
                                    <MenuItem value={1}>Internal (RH)</MenuItem>
                                    <MenuItem value={2}>External (Swat)</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Autocomplete
                            onChange={(event, newValue) => {
                                setProces2(newValue);
                            }}
                            value={Proces2}
                            options={DataProces ? DataProces.map((option) => option.id + '-' + option.Area) : []}
                            renderInput={(params) => <TextField {...params} label="Proces-Requests" />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Autocomplete
                            onChange={(event, newValue) => {
                                setProces(newValue);
                            }}
                            value={Proces}
                            options={DataProces ? DataProces.map((option) => option.id + '-' + option.Area) : []}
                            renderInput={(params) => <TextField {...params} label="Proces-Loaded" />}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={(event, newValue) => {setValue(newValue)}} aria-label="lab API tabs example">
                                <Tab label="Full Garments" value="1" />
                                <Tab label={datosDelHijo?<Badge badgeContent={1} color="secondary">Garments Parts</Badge>:"Garments Parts"} value="2" disabled={!Imgif} />
                            </TabList>
                            </Box>
                            <TabPanel value="1">
                                {DataRows && DataRows.map((rowData, index) => (
                                <Grid container spacing={1} key={index}>
                                    <Grid item xs={12} sm={2}>
                                    <TextField
                                        margin="normal"
                                        disabled
                                        value={rowData.GarmentSize || ''}
                                        fullWidth
                                        id="Size"
                                        label="Size"
                                        name="Size"
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                    <TextField
                                        margin="normal"
                                        disabled
                                        value={rowData.RequestCount || ''}
                                        type="number"
                                        fullWidth
                                        id="QtyPPM"
                                        label="QtyPPM"
                                        name="QtyPPM"
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                    <TextField
                                        margin="normal"
                                        type="number"
                                        fullWidth
                                        id="Qty"
                                        label="Qty"
                                        name="Qty"
                                        onChange={(e) => handleInputChange(e.target.value, index, 'CantRequirement')}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Autocomplete
                                            fullWidth
                                            // onChange={(e) => handleInputChange(e, index, 'ID_Error')}
                                            onChange={(event, newValue) => {
                                                handleInputChange(newValue, index, 'ID_Error')
                                              }}
                                            options={DataCode ? DataCode.map((option) => option.id + '-' + option.Problema) : []}
                                            renderInput={(params) => <TextField {...params} label="Reason" />}
                                        />
                                    </Grid>
                                </Grid>
                                ))}
                            </TabPanel>
                            <TabPanel value="2">
                                {KeyPPM?
                                <ImgTest 
                                    predatos={datosDelHijo} 
                                    obtenerDatos={obtenerDatosDelHijo} 
                                    key={KeyPPM || "defaultKey"} 
                                    garmentSizes={DataRows.map(row => ({ GarmentSize: row.GarmentSize, Description: row.Description }))} 
                                    code={DataCode}
                                    img={KeyPPM.split(Separador)[1]}
                                />
                                :false}
                            </TabPanel>
                        </TabContext>
                    </Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <TextField margin="normal" value={RequirementComments} onChange={e => setRequirementComments(e.target.value)} fullWidth id="Comments" label="Comments" name="Comments" inputRef={qtyTextFieldRef} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
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
              :false}
            </Paper>
          </Container>
          <Dialog open={ModalPartNumber} onClose={e => setModalPartNumber(false)} fullWidth maxWidth="md">
            <Box style={{ height: '250px' }}>
                {DataPPM ?
                    <DataGrid 
                    rows={DataPPM.filter(row => row.CategoryName === 'Fabric').map((row, index) => ({ ...row, id: index }))}
                    columns={columns}
                    density="compact"
                    />
                : false}
            </Box>
          </Dialog>
        </div>
      );
    }
    
    export default RequirementNew;