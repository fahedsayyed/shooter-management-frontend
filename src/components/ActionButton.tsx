// ActionButtons.tsx
import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import { IconPencil, IconTrash } from "@tabler/icons-react";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButton: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => (
  <>
    <Tooltip title="Edit">
      <IconButton sx={{ cursor: "pointer" }} onClick={onEdit}>
        <IconPencil size="22" stroke={1.4} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Delete">
      <IconButton sx={{ cursor: "pointer" }} onClick={onDelete}>
        <IconTrash size="22" stroke={1.4} />
      </IconButton>
    </Tooltip>
  </>
);

export default ActionButton;
