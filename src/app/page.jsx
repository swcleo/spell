'use client'

import { useState } from 'react'
import { Container, Paper, Typography, Box } from '@mui/material'
import InputSection from '../components/InputSection'
import PracticeSection from '../components/PracticeSection'
import CompleteSection from '../components/CompleteSection'
import useLocalStorage from '../hooks/useLocalStorage'
import { shuffle, parseWords } from '../utils/speak'

export default function Home() {
  const [view, setView] = useState('input')
  const [savedLists, setSavedLists, isLoaded] = useLocalStorage('spell-word-lists', [])
  const [words, setWords] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)

  const startPractice = (wordList) => {
    const shuffled = shuffle(wordList)
    setWords(shuffled)
    setCurrentIndex(0)
    setCorrectCount(0)
    setWrongCount(0)
    setView('practice')
  }

  const handleCorrect = () => {
    setCorrectCount(prev => prev + 1)
  }

  const handleWrong = () => {
    setWrongCount(prev => prev + 1)
  }

  const nextWord = () => {
    if (currentIndex + 1 >= words.length) {
      setView('complete')
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const restart = () => {
    setView('input')
    setWords([])
  }

  const saveList = (name, wordsText) => {
    const wordList = parseWords(wordsText)
    setSavedLists(prev => [...prev, { name, words: wordList }])
  }

  const deleteList = (index) => {
    setSavedLists(prev => prev.filter((_, i) => i !== index))
  }

  if (!isLoaded) {
    return null
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 4
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              textAlign: 'center',
              mb: 4,
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            英語聽寫練習
          </Typography>

          {view === 'input' && (
            <InputSection
              savedLists={savedLists}
              onStart={startPractice}
              onSave={saveList}
              onDelete={deleteList}
            />
          )}

          {view === 'practice' && (
            <PracticeSection
              words={words}
              currentIndex={currentIndex}
              onCorrect={handleCorrect}
              onWrong={handleWrong}
              onNext={nextWord}
            />
          )}

          {view === 'complete' && (
            <CompleteSection
              correctCount={correctCount}
              wrongCount={wrongCount}
              onRestart={restart}
            />
          )}
        </Paper>
      </Container>
    </Box>
  )
}
