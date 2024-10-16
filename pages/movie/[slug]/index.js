import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import localFont from 'next/font/local';

const geistSans = localFont({
  src: '../../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const MoviePage = () => {
  const router = useRouter();
  const [movie, setMovie] = useState();
  const [error, setError] = useState();
  const [newCharacterViewOpen, setNewCharacterViewOpen] = useState(false);
  const [newCharacterName, setNewCharacterName] = useState();
  const [newCharacterDesc, setNewCharacterDesc] = useState();
  const [newCharacterLikes, setNewCharacterLikes] = useState();
  const [newCharacterDislikes, setNewCharacterDislikes] = useState();
  const [newCharacterError, setNewCharacterError] = useState(null);
  const slug = router.query.slug;

  const loadMovie = useCallback(async () => {
    try {
      const res = await fetch(`/api/stories/${slug}`);

      if (res.ok) {
        const data = await res.json();

        console.log(data);

        setMovie(data);

        return;
      }

      setError(`Couldn't find movie, server responded with: ${res.status}`);
    } catch (err) {
      setError("Couldn't find movie");
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      loadMovie();
    }
  }, [slug, loadMovie]);

  const toggleNewCharacterView = () =>
    setNewCharacterViewOpen(
      (oldNewCharacterViewOpen) => !oldNewCharacterViewOpen
    );

  const handleCreateNewCharacter = async () => {
    try {
      const newCharacter = {
        name: newCharacterName,
        description: newCharacterDesc,
        likes: newCharacterLikes,
        dislikes: newCharacterDislikes,
      };

      const res = await fetch(`/api/stories/${slug}/new-character`, {
        method: 'POST',
        body: JSON.stringify(newCharacter),
      });

      if (res.ok) {
        loadMovie();
        setNewCharacterError(null);
        return;
      }

      setNewCharacterError(
        `Couldn't add new character, server responded with: ${res.status}`
      );
    } catch (err) {
      console.error(err);
      setNewCharacterError("Couldn't add new character");
    }
  };

  if (!movie) {
    return <p>loading...</p>;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} text-gray-800 bg-gradient-to-br from-gray-100 to-gray-300 grid items-center justify-items-center  font-[family-name:var(--font-geist-sans)]`}
    >
      <h1 className="text-2xl ">{movie.title}</h1>
      <Image
        src={movie.image}
        alt={`${movie.title} image`}
        width={200}
        height={200}
      />
      <p>{movie.text}</p>
      {movie.otherImages.map((image) => (
        <Image
          key={image}
          src={image}
          alt={`${movie.title} other image`}
          width={200}
          height={200}
        />
      ))}
      {movie?.characters && (
        <div>
          <h2 className="text-xl">Characters</h2>
          {movie.characters.map(({ name, description, likes, dislikes }) => (
            <div key={name + description}>
              <h2>{name}</h2>
              <p>{description}</p>
              <p>{likes}</p>
              <p>{dislikes}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={toggleNewCharacterView}>New character</button>
      {newCharacterViewOpen && (
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={newCharacterName}
            onChange={(e) => setNewCharacterName(e.target.value)}
          />
          <input
            type="text"
            value={newCharacterDesc}
            onChange={(e) => setNewCharacterDesc(e.target.value)}
          />
          <input
            type="textarea"
            value={newCharacterLikes}
            onChange={(e) => setNewCharacterLikes(e.target.value)}
          />
          <input
            type="textarea"
            value={newCharacterDislikes}
            onChange={(e) => setNewCharacterDislikes(e.target.value)}
          />
          <button onClick={handleCreateNewCharacter}>Add new character</button>
        </div>
      )}
      {newCharacterError && <p className="text-red-500">{newCharacterError}</p>}
    </div>
  );
};

export default MoviePage;
