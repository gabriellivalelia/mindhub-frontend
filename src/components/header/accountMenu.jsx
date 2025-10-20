import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Home from "@mui/icons-material/Home";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import EventAvailable from "@mui/icons-material/EventAvailable";
import Article from "@mui/icons-material/Article";
import NoteAdd from "@mui/icons-material/NoteAdd";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Colors from "../../globalConfigs/globalStyles/colors";
import FontSizes from "../../globalConfigs/globalStyles/fontSizes";
import { useAuthStore } from "../../stores/useAuthStore";

export default function AccountMenu({ avatarSrc }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    clearAuth();
    navigate("/");
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Abrir menu da conta">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={avatarSrc}
              sx={{
                width: 56,
                height: 56,
                border: `2px solid ${Colors.WHITE}`,
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            minWidth: 180,
            bgcolor: Colors.WHITE,
            color: Colors.DARK_GRAY,
            "& .MuiMenuItem-root": {
              fontSize: FontSizes.SMALL,
            },
            "& .MuiAvatar-root": {
              width: 40,
              height: 40,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 18,
              width: 10,
              height: 10,
              bgcolor: Colors.WHITE,
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/edit-profile");
          }}
        >
          <Avatar src={avatarSrc} /> Editar perfil
        </MenuItem>
        {user?.type === "psychologist" && (
          <Box>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/add-availabilities");
              }}
            >
              <ListItemIcon>
                <EventAvailable fontSize="small" />
              </ListItemIcon>
              Gerenciar disponibilidades
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/write-content");
              }}
            >
              <ListItemIcon>
                <NoteAdd fontSize="small" />
              </ListItemIcon>
              Escrever conteúdo
            </MenuItem>
          </Box>
        )}
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/");
          }}
        >
          <ListItemIcon>
            <Home fontSize="small" />
          </ListItemIcon>
          Home
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/appointments");
          }}
        >
          <ListItemIcon>
            <CalendarMonth fontSize="small" />
          </ListItemIcon>
          Consultas
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/contents");
          }}
        >
          <ListItemIcon>
            <Article fontSize="small" />
          </ListItemIcon>
          Conteúdos
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </Box>
  );
}
