import { NextResponse } from 'next/server'
import { getAllPostsMetadata } from '@/lib/posts'

export async function GET() {
  const posts = getAllPostsMetadata()
  return NextResponse.json(posts)
}
