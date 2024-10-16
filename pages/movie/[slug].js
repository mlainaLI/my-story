import Image from "next/image";

function MoviePage({ story }) {
  console.log(story);

  return (
    <div>
      <Image src={story.image} alt={story.title} width={1920} height={1080} />
      <h1>{story.title}</h1>
      <p>{story.text}</p>
      <div>
        {story.otherImages.map((image) => (
          <Image key={image} src={image} alt={""} width={1920} height={1080} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stories/${query.slug}`
  );
  const data = await res.json();

  return {
    props: {
      story: data,
    },
  };
}

export default MoviePage;
