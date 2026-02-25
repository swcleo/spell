'use client'

import { useState, useEffect, useRef } from 'react'
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Chip
} from '@mui/material'
import {
  VolumeUp,
  Check,
  Replay,
  SkipNext,
  NavigateNext,
  Lightbulb
} from '@mui/icons-material'
import { speak } from '../utils/speak'

const PracticeSection = ({ words, currentIndex, onCorrect, onWrong, onNext, onEnd }) => {
  const [answer, setAnswer] = useState('')
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [hintLevel, setHintLevel] = useState(0)
  const lastSpokenIndex = useRef(-1)

  const currentWord = words[currentIndex]

  useEffect(() => {
    if (lastSpokenIndex.current !== currentIndex) {
      lastSpokenIndex.current = currentIndex
      setAnswer('')
      setHasAnswered(false)
      setHintLevel(0)
      speak(currentWord)
    }
  }, [currentIndex, currentWord])

  const getHint = () => {
    const len = currentWord.length
    let revealed = 0

    if (hintLevel === 1) {
      revealed = Math.max(2, Math.ceil(len / 3))
    } else if (hintLevel >= 2) {
      revealed = Math.ceil(len * 2 / 3)
    }

    return currentWord
      .split('')
      .map((c, i) => (i < revealed ? c : '_'))
      .join(' ')
  }

  const showHint = () => {
    if (hintLevel < 2) {
      setHintLevel(prev => prev + 1)
    }
  }

  const handleSubmit = () => {
    if (hasAnswered) return

    const userAnswer = answer.trim().toLowerCase()
    const correct = userAnswer === currentWord

    setIsCorrect(correct)
    setHasAnswered(true)

    if (correct) {
      onCorrect()
    } else {
      onWrong()
    }
  }

  const handleSkip = () => {
    if (!hasAnswered) {
      setIsCorrect(false)
      setHasAnswered(true)
      onWrong()
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !hasAnswered) {
      handleSubmit()
    }
  }

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 3, color: '#888' }}>
        {currentIndex + 1} / {words.length}
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="輸入你聽到的單字"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={hasAnswered}
        autoFocus
        inputProps={{ style: { textAlign: 'center', fontSize: '1.2rem' } }}
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap', mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<Check />}
          onClick={handleSubmit}
          disabled={hasAnswered}
        >
          提交答案
        </Button>
        <Button
          variant="outlined"
          startIcon={<Replay />}
          onClick={() => speak(currentWord)}
        >
          重播
        </Button>
        <Button
          variant="outlined"
          startIcon={<Lightbulb />}
          onClick={showHint}
          disabled={hasAnswered || hintLevel >= 2}
        >
          提示
        </Button>
        <Button
          variant="outlined"
          startIcon={<SkipNext />}
          onClick={handleSkip}
        >
          跳過
        </Button>
      </Box>

      {hintLevel > 0 && !hasAnswered && (
        <Chip
          icon={<Lightbulb />}
          label={getHint()}
          color="warning"
          sx={{ mb: 2, fontSize: '1rem', py: 2 }}
        />
      )}

      {hasAnswered && (
        <Box sx={{ mt: 3 }}>
          <Alert
            severity={isCorrect ? 'success' : 'error'}
            sx={{ mb: 2, justifyContent: 'center' }}
          >
            {isCorrect ? '正確！' : `錯誤！正確答案：${currentWord}`}
          </Alert>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<NavigateNext />}
              onClick={onNext}
            >
              下一題
            </Button>
            <Button
              variant="outlined"
              onClick={onEnd}
            >
              結束練習
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default PracticeSection
