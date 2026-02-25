import { exec } from 'child_process'
import { NextResponse } from 'next/server'
import { readFile, unlink } from 'fs/promises'
import { randomUUID } from 'crypto'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get('text')
  const stream = searchParams.get('stream') === 'true'

  if (!text) {
    return NextResponse.json({ error: '缺少 text 參數' }, { status: 400 })
  }

  const safeText = text.replace(/[^a-zA-Z\s]/g, '')

  if (stream) {
    const filename = `/tmp/speak-${randomUUID()}.aiff`

    return new Promise((resolve) => {
      exec(`say -v Samantha -r 120 -o "${filename}" "${safeText}"`, async (error) => {
        if (error) {
          resolve(NextResponse.json({ error: '發音失敗' }, { status: 500 }))
          return
        }

        try {
          const audioData = await readFile(filename)
          await unlink(filename)

          resolve(new NextResponse(audioData, {
            headers: {
              'Content-Type': 'audio/aiff',
              'Content-Length': audioData.length.toString()
            }
          }))
        } catch {
          resolve(NextResponse.json({ error: '讀取音檔失敗' }, { status: 500 }))
        }
      })
    })
  }

  return new Promise((resolve) => {
    exec(`say -v Samantha -r 120 "${safeText}"`, (error) => {
      if (error) {
        resolve(NextResponse.json({ error: '發音失敗' }, { status: 500 }))
      } else {
        resolve(NextResponse.json({ success: true }))
      }
    })
  })
}
