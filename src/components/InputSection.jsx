'use client'

import { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider
} from '@mui/material'
import { Delete, PlayArrow, Save } from '@mui/icons-material'
import { parseWords } from '../utils/speak'

const InputSection = ({ savedLists, onStart, onSave, onDelete }) => {
  const [wordInput, setWordInput] = useState('')
  const [listName, setListName] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const handleStart = () => {
    const words = parseWords(wordInput)
    if (words.length === 0) {
      alert('請輸入至少一個單字')
      return
    }
    onStart(words)
  }

  const handleSave = () => {
    if (!listName.trim()) {
      alert('請輸入列表名稱')
      return
    }
    if (!wordInput.trim()) {
      alert('請輸入單字')
      return
    }
    onSave(listName.trim(), wordInput)
    setListName('')
  }

  const handleSelectList = (index) => {
    setSelectedIndex(index)
    setWordInput(savedLists[index].words.join('\n'))
  }

  return (
    <Box>
      {savedLists.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mb: 1, color: '#666', fontWeight: 500 }}>
            已儲存的單字列表
          </Typography>
          <List sx={{ bgcolor: '#f5f5f5', borderRadius: 2, mb: 2 }}>
            {savedLists.map((list, index) => (
              <ListItemButton
                key={index}
                selected={selectedIndex === index}
                onClick={() => handleSelectList(index)}
                sx={{ borderRadius: 2 }}
              >
                <ListItemText
                  primary={list.name}
                  secondary={`${list.words.length} 個單字`}
                />
                <IconButton
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(index)
                  }}
                  size="small"
                >
                  <Delete color="error" />
                </IconButton>
              </ListItemButton>
            ))}
          </List>
          <Divider sx={{ mb: 2 }} />
        </>
      )}

      <Typography variant="subtitle1" sx={{ mb: 1, color: '#666', fontWeight: 500 }}>
        輸入單字列表（一行一個或逗號分隔）
      </Typography>

      <TextField
        multiline
        rows={6}
        fullWidth
        variant="outlined"
        placeholder={'apple\nbanana\norange'}
        value={wordInput}
        onChange={(e) => setWordInput(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          size="small"
          placeholder="列表名稱"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          sx={{ flex: 1 }}
        />
        <Button
          variant="outlined"
          startIcon={<Save />}
          onClick={handleSave}
        >
          儲存
        </Button>
      </Box>

      <Button
        variant="contained"
        size="large"
        fullWidth
        startIcon={<PlayArrow />}
        onClick={handleStart}
        sx={{ py: 1.5 }}
      >
        開始練習
      </Button>
    </Box>
  )
}

export default InputSection
