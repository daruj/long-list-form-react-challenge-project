import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const StyledIconButton = styled(IconButton)({
  color: '#613f3f',
  '&:hover': {
    color: '#ba6767',
  },
});

interface CancelIconButtonProps {
  onClick(): void;
}

const CancelIconButton: React.FC<CancelIconButtonProps> = ({ onClick }) => {
  return (
    <StyledIconButton aria-label="delete" size="large" onClick={onClick}>
      <CancelIcon fontSize="inherit" />
    </StyledIconButton>
  );
};

export default CancelIconButton;
