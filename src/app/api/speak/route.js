import { NextResponse } from 'next/server'
import * as googleTTS from 'google-tts-api'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get('text')
  const stream = searchParams.get('stream') === 'true'

  if (!text) {
    return NextResponse.json({ error: '缺少 text 參數' }, { status: 400 })
  }

  const safeText = text.replace(/[^a-zA-Z\s]/g, '')

  try {
    const audioUrl = googleTTS.getAudioUrl(safeText, {
      lang: 'en',
      slow: false,
      host: 'https://translate.google.com',
    })

    if (stream) {
      const response = await fetch(audioUrl)
      if (!response.ok) {
        return NextResponse.json({ error: '獲取語音失敗' }, { status: 500 })
      }

      const audioData = await response.arrayBuffer()

      return new NextResponse(audioData, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': audioData.byteLength.toString()
        }
      })
    }

    return NextResponse.json({ success: true, audioUrl })
  } catch (error) {
    return NextResponse.json({ error: '發音失敗' }, { status: 500 })
  }
}
