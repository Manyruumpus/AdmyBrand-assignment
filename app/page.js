import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">ADmyBRAND Insights</h1>
      <Link href="/dashboard" className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground">
        Go to Dashboard
      </Link>
    </main>
  );
}