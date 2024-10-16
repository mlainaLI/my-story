import Image from "next/image";
import localFont from "next/font/local";
import Head from "next/head";
import Router from "next/router";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function Home({ stories, totalPages }) {
  console.log('stories', stories)
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
              <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Story Collection</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stories.map((story, index) => (
                  <div
                    key={index}
                    className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl"
                    onClick={() => Router.push(`/stories/${story.slug}`)}
                  >
                    <div className="relative h-64">
                      <Image
                        src={story.image}
                        alt={story.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold mb-2 text-gray-800">{story.title}</h2>
                      <p className="text-gray-600 line-clamp-4">{story.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stories?page=1`)
  const data = await res.json()
console.log('data', data)
  return {
    props: {
      stories: data.stories,
      totalPages: data.totalPages,
    },
  }
}
