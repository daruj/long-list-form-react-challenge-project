import { Box } from '@mui/material';

interface ContentContainerProps {
  children: React.ReactElement;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      padding="30px"
      height="calc(100vh - 150px)"
    >
      <Box width={1024} display="flex" flexDirection="column" alignItems="center">
        {children}
      </Box>
    </Box>
  );
};

export default ContentContainer;
