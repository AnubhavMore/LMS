import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Setting up Supabase Storage...")

  try {
    // Create the bucket
    await prisma.$executeRawUnsafe(`
      INSERT INTO storage.buckets (id, name, public)
      VALUES ('lms-assets', 'lms-assets', true)
      ON CONFLICT (id) DO NOTHING;
    `)
    console.log("✅ Bucket 'lms-assets' created (or already exists).")

    // Set up RLS policies for storage.objects
    
    // 1. Allow public read access to the bucket
    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Public Read Access"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'lms-assets');
    `)
    console.log("✅ Read policy created.")

    // 2. Allow authenticated users to upload files
    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Authenticated users can upload"
      ON storage.objects FOR INSERT
      WITH CHECK (
        bucket_id = 'lms-assets' AND
        auth.role() = 'authenticated'
      );
    `)
    console.log("✅ Insert policy created.")

    // 3. Allow users to update their own files
    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Users can update their own files"
      ON storage.objects FOR UPDATE
      USING (
        bucket_id = 'lms-assets' AND
        auth.uid() = owner
      );
    `)
    console.log("✅ Update policy created.")

    // 4. Allow users to delete their own files
    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Users can delete their own files"
      ON storage.objects FOR DELETE
      USING (
        bucket_id = 'lms-assets' AND
        auth.uid() = owner
      );
    `)
    console.log("✅ Delete policy created.")

  } catch (e: any) {
    // Ignore policy already exists errors
    if (e.message.includes('already exists')) {
      console.log("✅ Policies already exist.")
    } else {
      console.error("❌ Error setting up storage:", e)
    }
  }

  console.log("Storage setup complete!")
}

main().finally(async () => await prisma.$disconnect())
