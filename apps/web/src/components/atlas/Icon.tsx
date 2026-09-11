export function Icon({ name = "tools" }: { name?: string }) {
  const paths: Record<string, string> = {
    tools: "M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM8 7h8M8 11h1m6 0h1m-8 4h1m6 0h1m-8 3h1m6 0h1",
    learn: "M12 5C8 2 4 3 2 4v15c4-2 7-1 10 1 3-2 6-3 10-1V4c-2-1-6-2-10 1Zm0 0v15",
    sim: "M3 4h18v14H3ZM8 22h8m-4-4v4M5 11h3l2-4 3 8 2-4h4",
    live: "M21 11a9 9 0 0 1-9 9H3l1-5a9 9 0 1 1 17-4ZM7 11h.01M12 11h.01M17 11h.01",
    search: "M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
    menu: "M4 6h16M4 12h16M4 18h16", close: "m6 6 12 12M18 6 6 18",
    heart: "M12 21S2 15 2 8a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 7-10 13-10 13Z",
    arrow: "M4 12h16m-6-6 6 6-6 6", check: "m5 12 4 4L19 6"
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name] ?? paths.tools} /></svg>;
}
