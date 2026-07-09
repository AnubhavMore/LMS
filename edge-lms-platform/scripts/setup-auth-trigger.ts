import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Setting up Supabase auth triggers...")

  // Create the trigger function
  await prisma.$executeRawUnsafe(`
    create or replace function public.handle_new_user()
    returns trigger
    language plpgsql
    security definer set search_path = public
    as $$
    begin
      insert into public.users (id, email, name, role, company_id, created_at, updated_at)
      values (
        new.id::text,
        new.email,
        coalesce(new.raw_user_meta_data->>'name', 'New User'),
        'Learner'::public."Role", 
        coalesce(new.raw_user_meta_data->>'companyId', 'de816d10a0c00bc7ccf6588d'),
        now(),
        now()
      );
      return new;
    end;
    $$;
  `)

  // Create the trigger itself
  await prisma.$executeRawUnsafe(`
    drop trigger if exists on_auth_user_created on auth.users;
  `)
  await prisma.$executeRawUnsafe(`
    create trigger on_auth_user_created
      after insert on auth.users
      for each row execute procedure public.handle_new_user();
  `)

  console.log("Trigger setup complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
