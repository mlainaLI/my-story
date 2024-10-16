import {useEffect, useState} from "react";
import Image from "next/image";
import localFont from "next/font/local";
import Head from "next/head";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home({ story }) {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/characters")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      likes: formData.get("likes"),
      dislikes: formData.get("dislikes"),
      slug: story.slug,
    };
    console.log('data', data);
    fetch("http://localhost:3000/api/characters", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCharacters((prev) => [...prev, data]);
      });
  }

  return (
    <>
      <Head>
        <title>Story Collection</title>
        <meta name="description" content="Explore our collection of amazing stories" />
      </Head>
      <div
        className={`${geistSans.variable} ${geistMono.variable}  bg-gradient-to-br from-gray-100 to-gray-300 grid items-center justify-items-center  font-[family-name:var(--font-geist-sans)]`}
      >
        <main className="flex items-center">
          <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">{story.title}</h1>
              <div className="p-6 w-full">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-800">{story.title}</h2>
                  <p className="text-gray-600 line-clamp-4">{story.text}</p>
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  style={{ objectFit: "cover" }}
                /> */}

                {story.otherImages.map((image, index) => (
                  <div
                    key={index}
                    className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl"
                  >
                    <div className="relative h-64 w-64">
                      <Image
                        src={image}
                        alt={story.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                ))}
                {characters.map((character, index) => (
                  <div key={index} className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl">
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold mb-2 text-gray-800">{character.name}</h2>
                      <p className="text-gray-600 line-clamp-4">{character.description}</p>
                      <p className="text-gray-600 line-clamp-4">Gustos: {character.likes}</p>
                      <p className="text-gray-600 line-clamp-4">Cosas que no le gustan: {character.dislikes}</p>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Editar
                    </button>
                  </div>
                ))}
                <form className="w-full max-w-lg mt-8" onSubmit={handleSubmit}>
                  <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Nombre
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                    type="text"
                    placeholder="Nombre del personaje"
                  />
                  </div>
                  <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Descripción
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="description"
                    placeholder="Descripción del personaje"
                  />
                  </div>
                  <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="likes">
                    Gustos
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="likes"
                    type="text"
                    placeholder="Gustos del personaje"
                  />
                  </div>
                  <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dislikes">
                    Cosas que no le gustan
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="dislikes"
                    type="text"
                    placeholder="Cosas que no le gustan al personaje"
                  />
                  </div>
                  <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Guardar
                  </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}


export async function getServerSideProps ({ params }) {
  const { slug } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stories/${slug}`);
  const story = await res.json();
  return {
    props: {
      story,
    },
  };
}