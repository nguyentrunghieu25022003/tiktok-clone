import { Box, Button, Stack } from '@mui/material';
import { AttachMoney, GetApp, PhoneIphone } from '@mui/icons-material';

const TopBar = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={1}
      gap={1}
      bgcolor="#fff"
      sx={{ padding: '10px' }}
    >
      <img src='/imgs/TikTok_logo.svg.png' alt="TikTok logo" style={{ width: '150px'}} />

      <Stack direction="row" spacing={1}>
        <Button variant="outlined" startIcon={<AttachMoney />} sx={{ textTransform: 'none', borderRadius: 3, color: 'black', border: '1px solid rgba(255, 255, 255, 0.5)', background: 'rgba(22, 24, 35, 0.06)', }}>Nhận Xu</Button>
        <Button variant="outlined" startIcon={<PhoneIphone />} sx={{ textTransform: 'none', borderRadius: 3, color: 'black', border: '1px solid rgba(255, 255, 255, 0.5)', background: 'rgba(22, 24, 35, 0.06)', }}>Tải ứng dụng</Button>
        <Button variant="outlined" startIcon={<GetApp />} sx={{ textTransform: 'none', borderRadius: 3, color: 'black', border: '1px solid rgba(255, 255, 255, 0.5)', background: 'rgba(22, 24, 35, 0.06)', }}>Ứng dụng dành cho Windows</Button>
        <Button variant="contained" color="error" sx={{ borderRadius: 5, background: 'rgba(254, 44, 85, 1)' }}>Đăng nhập</Button>
      </Stack>
    </Box>
  );
};

export default TopBar;
