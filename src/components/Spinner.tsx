export function LoadingSpinner() {
  return (
    <svg
      className="w-[1.2rem] h-[1.2rem] text-slate-400"
      viewBox="0 0 30 30"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm0-4.5c5.799 0 10.5-4.701 10.5-10.5S20.799 4.5 15 4.5 4.5 9.201 4.5 15 9.201 25.5 15 25.5z"
        fill="currentColor"
        className="text-opacity-20 text-slate-400"
      ></path>
      <path
        d="M15 0C6.716 0 0 6.716 0 15h4.5C4.5 9.201 9.201 4.5 15 4.5V0z"
        fill="currentColor"
        className="origin-center text-slate-400 animate-spin"
      />
    </svg>
  );
}

export function RefreshSpinner({ isRefreshing }: { isRefreshing: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 ${isRefreshing && "animate-spin"}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}
