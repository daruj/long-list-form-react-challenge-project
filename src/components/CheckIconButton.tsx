import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const StyledIconButton = styled(IconButton)({
  color: '#3f6149',
  '&:hover': {
    color: '#71ba67',
  },
});

interface CheckIconButtonProps {
  onClick?: () => void;
  type?: 'submit';
}

const CheckIconButton: React.FC<CheckIconButtonProps> = ({ onClick, type }) => {
  return (
    <StyledIconButton aria-label="delete" size="large" onClick={onClick} type={type}>
      <CheckIcon fontSize="inherit" />
    </StyledIconButton>
  );
};

export default CheckIconButton;
