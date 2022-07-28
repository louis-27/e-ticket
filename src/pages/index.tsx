import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import { fetcher } from "~/lib/fetcher";
import { SEO } from "~/components/SEO";

export default function Home() {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await fetcher("auth/login", { password });
    if (user.status === 200) {
      router.push("/dashboard");
    } else {
      // TODO (Low): Incorrect password message
      window.alert("Incorrect password");
    }
  };

  return (
    <>
      <SEO />
      <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col justify-center">
        <div className="mt-6 mx-auto w-full max-w-md py-8 px-6 bg-white rounded-lg shadow-sm space-y-4">
          <div className="flex items-center">
            <Image src="/logo.png" alt="logo" width="250px" height="250px" />
            <Image src="/logo.png" alt="logo" width="250px" height="250px" />
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="text-2xl font-bold text-center">E-Ticket PKPM</div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col" method="POST">
            <label className="text-base font-medium">
              Enter Master Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 mb-4 border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 text-white font-medium hover:bg-opacity-80 rounded"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
