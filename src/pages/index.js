import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [Place, setPlace] = useState("");
  const [Days, setDays] = useState("");

  const [Result, setResult] = useState("");

  const generateBio = async () => {
    setResult("")
    const content = `
    Generate a plan of ${Days} days of tour to ${Place}, also give me website links of each place for guide`;

    const response = await fetch("/api/gptapi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResult((prev) => prev + chunkValue);
    }
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <label
          htmlFor="place"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Place
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <input
            type="text"
            name="place"
            id="place"
            value={Place}
            onChange={(e) => {
              setPlace(e.target.value);
            }}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Lahore , Karachi , Kashmir"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="days"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Days
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <input
            type="text"
            name="days"
            id="days"
            value={Days}
            onChange={(e) => {
              setDays(e.target.value);
            }}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Lahore , Karachi , Kashmir"
          />
        </div>
      </div>

      <button
        type="button"
        className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={generateBio}
      >
        Generate Response
      </button>

      {/* <button className="rounded-full" onClick={generateBio}>
        Generate Response
      </button> */}
      <p></p>
      {Result}
    </main>
  );
}
