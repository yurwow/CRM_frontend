import { useState } from "react";
import { Fab, Box, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone"; // Пример для добавления взаимодействия

interface FabButtonProps {
    onAddClick: () => void;
    onDeleteClick: () => void;
}

export const FabButton = ({ onAddClick, onDeleteClick }: FabButtonProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
            <Fab
                color="primary"
                sx={{
                    boxShadow: 4,
                    transition: "0.3s ease-in-out",
                    "&:hover": { transform: "scale(1.1)" },
                    zIndex: 1,
                }}
                onClick={() => setOpen(!open)}
            >
                <AddIcon />
            </Fab>

            {open && (
                <Tooltip title="Добавить взаимодействие" arrow>
                    <Fab
                        color="secondary"
                        sx={{
                            position: "absolute",
                            bottom: 70,
                            right: 0,
                            boxShadow: 4,
                            transition: "0.3s ease-in-out",
                            "&:hover": { transform: "scale(1.1)" },
                            zIndex: 0,
                        }}
                        onClick={onAddClick}
                    >
                        <PhoneIcon />
                    </Fab>
                </Tooltip>
            )}

            {open && (
                <Tooltip title="Удалить клиента" arrow>
                    <Fab
                        color="error"
                        sx={{
                            position: "absolute",
                            bottom: 130,
                            right: 0,
                            boxShadow: 4,
                            transition: "0.3s ease-in-out",
                            "&:hover": { transform: "scale(1.1)" },
                            zIndex: 0,
                        }}
                        onClick={onDeleteClick}
                    >
                        <DeleteIcon />
                    </Fab>
                </Tooltip>
            )}
        </Box>
    );
};
