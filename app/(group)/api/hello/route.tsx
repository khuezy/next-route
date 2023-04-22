
import { ImageResponse, NextRequest } from 'next/server'

async function someAsyncFunc(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    await fetch(new URL('https://google.com'), { cache: 'no-store' })
    resolve('ok')
  })
}
export async function GET(req: NextRequest) {

  // Since this is before accessing the Request object,
  // Next will try to prerender this...
  await someAsyncFunc()

  // But I expect this GET to be dynamically rendered
  // since I'm using the Request object.
  // If I  move this block above the await above, it works.
  const { searchParams } = new URL(req.url)
  const title = searchParams?.get('title') || ''

  return new ImageResponse(
    <div tw='flex w-screen h-screen  text-lg' style={{ backgroundColor: '#86efac' }}>
      <div tw='flex flex-col text-center ml-10 text-4xl text-sky-600'>
        <h1>{title}</h1>
      </div>
    </div>,
    {
      width: 800,
      height: 400
    }
  )
}