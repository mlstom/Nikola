'use server'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Admin() {
  const cookieStore =await cookies(); // ✅ pozivaš kao funkciju
  const token = cookieStore.get('admin_token'); // ✅ sinhrono izvučeš vrednost

  if (!token || token.value !== 'ulogovan') {
    redirect('/admin/login'); // ✅ redirect radi u server komponenti
  }
  redirect('/admin/page/proizvodi')
}
