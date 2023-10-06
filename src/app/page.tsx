export default function Home() {
  return (
    <main>
      <form method="get" action="/search" autoComplete="off">
        <input
          className="text-black"
          type="text"
          name="q"
          placeholder="Search for artists"
        />
        <button type="submit">search</button>
      </form>
    </main>
  );
}
