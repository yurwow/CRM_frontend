import {Button, CircularProgress, IconButton, List, ListItem, ListItemText, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@/shared/lib/hooks/reduxHooks.ts";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getInteractionsById, removeInteractionById,} from "@/features/interactions/model/interactionsSlice.ts";
import {CreateInteractionModal} from "@/widgets/CreateInteractionModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {IInteraction} from "@/entities/Interactions/types.ts";

export const InteractionsList = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const { interactions, status: interactionsStatus, error: interactionsError } = useAppSelector(state => state.interactions);

    useEffect(() => {
        dispatch(getInteractionsById({id: Number(id)}))
    }, [dispatch, id]);

    const [open, setOpen] = useState(false)
    const [editingInteraction, setEditingInteraction] = useState<IInteraction | null>(null);

    const handleDelete = (interactionId: number) => {
        dispatch(removeInteractionById({ id: interactionId }));
    };

    const handleEdit = (interaction: IInteraction) => {
        setEditingInteraction(interaction);
        setOpen(true);
    };

    return (
        <>
            <Typography variant="h5" sx={{ mt: 3 }}>
                Взаимодействия
            </Typography>
            {interactionsStatus === "loading" && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}
            {interactionsStatus && <Typography color="error">{interactionsError}</Typography>}
            {interactions.length === 0 ? (
                <Typography>Нет взаимодействий</Typography>
            ) : (
                <List>
                    {interactions.map((interaction) => (
                        <ListItem key={interaction.id} secondaryAction={
                            <>
                                <IconButton color="primary" onClick={() => handleEdit(interaction)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color="error"
                                    onClick={() => interaction.id && handleDelete(interaction.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }>
                            <ListItemText
                                primary={interaction.type}
                                secondary={interaction.notes ? `📝 ${interaction.notes}` : "Без заметок"}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
            <Button variant="contained" onClick={() => setOpen(true)}>Добавить взаимодействие</Button>
            <CreateInteractionModal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setEditingInteraction(null);
                }}
                client_id={Number(id)}
                editingInteraction={editingInteraction}
            />
        </>
    );
};
