"use server"

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

function getSupabase() {
  const cookieStore = cookies() as any
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

const BUCKET_NAME = 'lms-assets'

/**
 * Upload a file to Supabase Storage.
 * Needs to accept FormData because File objects cannot be passed directly to Server Actions.
 */
export async function uploadFile(formData: FormData, path: string) {
  const file = formData.get('file') as File
  if (!file) {
    throw new Error('No file provided')
  }

  const supabase = getSupabase()
  
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) {
    console.error('Storage upload error:', error)
    throw error
  }

  return data
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(path: string) {
  const supabase = getSupabase()
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path])

  if (error) {
    console.error('Storage delete error:', error)
    throw error
  }

  return data
}

/**
 * Get the public URL for a file in Supabase Storage
 */
export function getPublicUrl(path: string) {
  const supabase = getSupabase()
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path)
    
  return data.publicUrl
}
