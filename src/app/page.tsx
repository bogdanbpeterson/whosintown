export default function Home() {
  return (
    <main className="flex h-full w-full flex-col items-start justify-center gap-6">
      <h1 className="text-3xl font-bold text-amber-950">Who&apos;s in town?</h1>
      <form
        className="flex w-full gap-4"
        method="get"
        action="/search"
        autoComplete="off"
      >
        <input
          className="w-full max-w-lg border-2 border-amber-700 bg-amber-200 p-3 text-amber-600 outline-none placeholder:text-amber-500 focus-within:ring-2 focus-within:ring-amber-800"
          type="text"
          name="q"
          placeholder="Search for artists"
          required
        />
        <button
          className="border-2 border-amber-700 bg-amber-200 p-3 text-amber-600"
          type="submit"
        >
          search
        </button>
      </form>
    </main>
  );
}
