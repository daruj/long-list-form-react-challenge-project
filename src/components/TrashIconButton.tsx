import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledIconButton = styled(IconButton)({
  color: '#613f3f',
  '&:hover': {
    color: '#ba6767',
  },
});

interface TrashIconButtonProps {
  onClick(): void;
}

const TrashIconButton: React.FC<TrashIconButtonProps> = ({ onClick }) => {
  return (
    <StyledIconButton aria-label="delete" size="large" onClick={onClick}>
      <DeleteIcon fontSize="inherit" />
    </StyledIconButton>
  );
};

export default TrashIconButton;
