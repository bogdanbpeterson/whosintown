export default function Home() {
  return (
    <main className="flex h-full w-full flex-col items-start justify-center gap-6">
      <h1 className="text-3xl font-bold">Who&apos;s in town?</h1>
      <form
        className="flex w-full"
        method="get"
        action="/search"
        autoComplete="off"
      >
        <input
          className="w-full max-w-lg border-2 border-black p-3 outline-none placeholder:text-black "
          type="text"
          name="q"
          placeholder="Search for artists"
          required
        />
        <button className="bg-black p-3 text-white" type="submit">
          search
        </button>
      </form>
    </main>
  );
}
