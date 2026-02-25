'use client'

import { Button, Box, Typography } from '@mui/material'
import { Refresh, EmojiEvents } from '@mui/icons-material'

const CompleteSection = ({ correctCount, wrongCount, onRestart }) => {
  const total = correctCount + wrongCount
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0

  return (
    <Box sx={{ textAlign: 'center' }}>
      <EmojiEvents sx={{ fontSize: 80, color: '#ffc107', mb: 2 }} />

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        練習完成！
      </Typography>

      <Typography variant="h2" sx={{ mb: 1, fontWeight: 'bold', color: '#667eea' }}>
        {percentage}%
      </Typography>

      <Typography variant="body1" sx={{ mb: 3, color: '#888' }}>
        正確：{correctCount} / 錯誤：{wrongCount}
      </Typography>

      <Button
        variant="contained"
        size="large"
        startIcon={<Refresh />}
        onClick={onRestart}
      >
        重新開始
      </Button>
    </Box>
  )
}

export default CompleteSection
