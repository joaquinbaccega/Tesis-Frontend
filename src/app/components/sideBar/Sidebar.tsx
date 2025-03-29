import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  Divider,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(false);

  const handleToggleSubMenu = () => {
    setOpenSubMenu(!openSubMenu);
  };

  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          backgroundColor: "#f3f4f6",
          color: "black",
          height: "94vh",
          width: "16rem",
          padding: "1rem",
        }}
      >
        <Typography
          id="titulo"
          variant="h5"
          style={{
            color: "black",
            
          }}
        >
          OsteoHelth
        </Typography>
        <Divider
          sx={{
            borderColor: "black",
            width: "100%",
          }}
        />
        <Typography
          id="titulo"
          variant="subtitle2"
          style={{
            color: "black",
            
          }}
        >
          V 0.0.1
        </Typography>
          
        <List sx={{ width: "100%", maxWidth: 360, color: "black" }}>
          
          {/* Opción Inicio */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon style={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="Inicio" 
                onClick={() => router.push("/")}
              />
            </ListItemButton>
          </ListItem>

          {/* Opción Pacientes */}
          <ListItem disablePadding>
            <ListItemButton onClick={handleToggleSubMenu}>
              <ListItemIcon>
                <PeopleIcon style={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="Pacientes" />
              {openSubMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          {/* Submenú de Pacientes */}
          <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding style={{ marginLeft: "1rem" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Listado de pacientes" onClick={() => router.push("/inicio")} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Ver datos de pacientes" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Agregar paciente" 
                  onClick={() => router.push("/registerUser")}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>

          {/* Opción Turnos */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EventNoteIcon style={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary="Turnos" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
      <div 
        style={{
          borderLeft: "1px solid black",
          height: "100%",
        }}
      ></div>
    </div>
  );
};

export default Sidebar;
