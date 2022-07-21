import { useRouter } from "next/router";
import { fetcher } from "~/lib/fetcher";

export function Nav() {
  const router = useRouter();

  const logOut = async () => {
    await fetcher("logout");
    console.log("hi");
    router.push("/");
  };

  return (
    <nav className="h-16 border-b shadow-md border-gray-200">
      <div className="max-w-5xl m-auto h-full flex justify-between items-center">
        <div className="text-2xl font-bold">E-Ticket</div>
        <button
          className="bg-red-500 px-4 py-2 text-white font-medium hover:bg-opacity-80 rounded"
          onClick={logOut}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}
