import React, {useState} from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import RecyclingIcon from '@mui/icons-material/Recycling';
import DatasetIcon from '@mui/icons-material/Dataset';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AdfScannerIcon from '@mui/icons-material/AdfScanner';
import GradingIcon from '@mui/icons-material/Grading';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { useNavigate } from 'react-router-dom';


function ListItem() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);
    const [open4, setOpen4] = useState(true);
    const [open5, setOpen5] = useState(true);
    const handleClick = () => {
      setOpen(!open);
    };
    const handleClick2 = () => {
        setOpen2(!open2);
    };
    const handleClick3 = () => {
    setOpen3(!open3);
    };
    const handleClick4 = () => {
        setOpen4(!open4);
        };
    const handleClick5 = () => {
        setOpen5(!open5);
        };
    return (
    <React.Fragment>
        <ListItemButton onClick={handleClick}>
            <ListItemIcon>
                <RecyclingIcon />
            </ListItemIcon>
            <ListItemText primary="Requirement" />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List onClick={() => navigate('/Main/RequirementNew')} component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                    <NoteAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="New" />
                </ListItemButton>
            </List>
            <List onClick={() => navigate('/Main/RequirementData')} component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                        <DatasetIcon />
                    </ListItemIcon>
                    <ListItemText primary="Requirement" />
                </ListItemButton>
            </List>
            <List onClick={() => navigate('/Main/RequirementData')} component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                        <GradingIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inspection" />
                </ListItemButton>
            </List>
            <List onClick={() => navigate('/Main/RequirementData')} component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                        <LocalPrintshopIcon />
                    </ListItemIcon>
                    <ListItemText primary="Plotter" />
                </ListItemButton>
            </List>
            <List onClick={() => navigate('/Main/RequirementData')} component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                        <AdfScannerIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sublimated" />
                </ListItemButton>
            </List>
        </Collapse>
        <ListItemButton onClick={handleClick3}>
            <ListItemIcon>
                <TableRowsIcon />
            </ListItemIcon>
            <ListItemText primary="Warehouse" />
            {open3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open2} timeout="auto" unmountOnExit>
            <List onClick={() => navigate('/Main/WarehouseSublimated')} component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                        <DocumentScannerIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sublimated" />
                </ListItemButton>
            </List>
        </Collapse>
    </React.Fragment>
  )
}

export default ListItem