import { Box, Typography, LinearProgress } from '@mui/material'

export default function LoadingSection({ loaded, total }) {
  const progress = total > 0 ? (loaded / total) * 100 : 0

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 3, color: '#666' }}>
        正在載入音檔...
      </Typography>

      <Box sx={{ width: '100%', mb: 2 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
              backgroundColor: '#667eea'
            }
          }}
        />
      </Box>

      <Typography variant="body1" sx={{ color: '#999' }}>
        {loaded} / {total} 個單字
      </Typography>
    </Box>
  )
}
