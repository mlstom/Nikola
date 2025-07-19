import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export default function AdminLoginPage() {
  const token = cookies().get('admin_token')?.value;

  if (token == 'ulogovan') {
    redirect('/admin/page');
  }

  return (
    <main className="w-full max-w-md mx-auto p-6">
      <div className="rounded-xl shadow-lg bg-gray-800 border-[#d39430] border-2 p-6">
        <h1 className="text-2xl text-white font-bold text-center mb-6">Admin prijava</h1>
        <LoginForm />
      </div>
    </main>
  );
}
