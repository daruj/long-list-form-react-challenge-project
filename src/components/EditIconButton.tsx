import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const StyledIconButton = styled(IconButton)({
  color: '#3f4a61',
  '&:hover': {
    color: '#67a0ba',
  },
});

interface EditIconButtonProps {
  onClick(): void;
}

const EditIconButton: React.FC<EditIconButtonProps> = ({ onClick }) => {
  return (
    <StyledIconButton aria-label="delete" size="large" onClick={onClick}>
      <EditIcon fontSize="inherit" />
    </StyledIconButton>
  );
};

export default EditIconButton;
