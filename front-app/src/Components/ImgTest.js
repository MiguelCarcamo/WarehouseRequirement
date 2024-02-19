import React, { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Autocomplete, TextField, Grid, FormControl, Checkbox } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';
import "./styles.css";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function ImgTest({ garmentSizes, code, obtenerDatos, predatos, img }) {
  const { editor, onReady } = useFabricJSEditor();
  const history = [];
  const [cropImage, setCropImage] = useState(true);
  const [Code, setCode] = useState(null);
  const [Size, setSize] = useState(null);
  const [Number, setNumber] = useState([]);
  const [Qty, setQty] = useState(0);
  const [ListNumber, setListNumber] = useState([]);
  const [canvasContent, setCanvasContent] = useState(null);

  const addBackground = () => {
    if (!editor || !fabric) {
      return;
    }
    
    fabric.Image.fromURL(
      "https://arnpythondev.tegraglobal.com:5010/api/SendImage/"+img+".png",
      (image) => {
        // Ajustar la escala de la imagen al tamaño del lienzo
        const scaleFactorX = editor.canvas.width / image.width;
        const scaleFactorY = editor.canvas.height / image.height;
        
        image.set({
          scaleX: scaleFactorX,
          scaleY: scaleFactorY,
        });

        editor.canvas.setBackgroundImage(
          image,
          editor.canvas.renderAll.bind(editor.canvas)
        );
      }
    );
  };

  const saveCanvasToJson = () => {
    const json = editor.canvas.toDatalessJSON();
    setCanvasContent(json);
    obtenerDatos(json);
  };


  const clear = () => {
    editor.canvas._objects.splice(0, editor.canvas._objects.length);
    history.splice(0, history.length);
    editor.canvas.renderAll();
    setCanvasContent(null);
    obtenerDatos(null);
  };

  const removeSelectedObject = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
  };

  const addText = (id, siz, num, qty) => {
    if(id && siz){
      if(num.length > 0){
        editor.addText(id + "/" + siz + "/" + qty + "/[" + num + "]");
      }else{
        editor.addText(id + "/" + siz + "/" + qty);
      }
    }
  };

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    
    if (cropImage) {
      editor.canvas.__eventListeners = {};
      return;
    }
    
    if (!editor.canvas.__eventListeners["mouse:wheel"]) {
      editor.canvas.on("mouse:wheel", function (opt) {
        var delta = opt.e.deltaY;
        var zoom = editor.canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });
    }
    
    if (!editor.canvas.__eventListeners["mouse:down"]) {
      editor.canvas.on("mouse:down", function (opt) {
        var evt = opt.e;
        if (evt.ctrlKey === true) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });
    }
    
    if (!editor.canvas.__eventListeners["mouse:move"]) {
      editor.canvas.on("mouse:move", function (opt) {
        if (this.isDragging) {
          var e = opt.e;
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });
    }
    
    if (!editor.canvas.__eventListeners["mouse:up"]) {
      editor.canvas.on("mouse:up", function (opt) {
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
      });
    }
    
    editor.canvas.renderAll();
  }, [editor]);

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.setHeight(400);
    // editor.canvas.setWidth(600);
    addBackground();
    editor.canvas.renderAll();
  }, [editor?.canvas.backgroundImage]);

  useEffect(() => {
    if (predatos && editor && editor.canvas) {
      editor.canvas.loadFromJSON(predatos, () => {
        editor.canvas.renderAll();
      });
    }
  }, [predatos, editor]);

  return (
    <div className="App">
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={6}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <IconButton size="small" variant="outlined" color="primary" onClick={saveCanvasToJson}>
                  <SaveAsIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton size="small" variant="contained" color="error" onClick={clear} disabled={!cropImage}>
                  <DeleteSweepIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton size="small" variant="contained" color="error" onClick={removeSelectedObject} disabled={!cropImage}>
                  <ClearIcon />
                </IconButton>
              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                onChange={(event, newValue) => {
                  setCode(newValue);
                }}
                value={Code}
                options={code ? code.map((option) => option.id + '-' + option.Problema) : []}
                renderInput={(params) => <TextField {...params} label="Reason" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Autocomplete
                  fullWidth
                  onChange={(event, newValue) => {
                    setSize(newValue);
                    setNumber([]);
                    if (newValue !== "") {
                        const foundItem = garmentSizes.find(item => item.GarmentSize === newValue);
                        if (foundItem && foundItem.Description) {
                            setListNumber(foundItem.Description.split(","));
                        } else {
                            setListNumber([]);
                        }
                    } else {
                        setListNumber([]);
                    }
                  }}
                  value={Size}
                  options={garmentSizes ? garmentSizes.map((option) => option.GarmentSize) : []}
                  renderInput={(params) => <TextField {...params} label="Size" />}
                />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Autocomplete
                multiple  // Permite selección múltiple
                id="Autocomplete-Number"
                options={ListNumber}
                disableCloseOnSelect
                value={Number}
                onChange={(event, newValue) => {
                  setNumber(newValue);
                }}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option} {/* Mostrar la opción tal cual es, ya que son cadenas de texto */}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Number" placeholder="Number" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField margin="normal" type="number" value={Qty} onChange={e => setQty(e.target.value)} fullWidth id="Qty" label="Qty" name="Qty" />
            </Grid>
            <Grid item xs={12} sm={1}>
              <IconButton size="small" variant="contained" color="success" onClick={() => (Code && Size) ? addText(Code.split("-")[0], Size, Number, Qty) : false} disabled={!cropImage}>
                <AddCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
    </Grid>
    <div
      style={{
      border: `3px ${!cropImage ? "dotted" : "solid"} Green`,
      width: "100%",
      height: "400px"
      }}
    >
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  </div>
  )
}

export default ImgTest