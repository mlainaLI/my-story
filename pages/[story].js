import Image from "next/image";

import React, { useState } from "react";

export default function Story({ stories }) {
  const { slug, title, image, text, otherImages } = stories;
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    image: "",
    text: "",
    otherImages: [],
  });

  const otherImage = otherImages.map((img) => {
    return (
      <Image
        src={img}
        alt={title}
        objectFit="cover"
        width={200}
        height={200}
        priority
      />
    );
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to upload data");
      }
      alert("Data uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Error uploading data");
    }
  };

  return (
    <main>
      <section>
        <h1>Title: {title}</h1>
        <Image
          src={image}
          alt={title}
          objectFit="cover"
          width={200}
          height={200}
          priority
        />
        <p>{text}</p>
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {otherImage}
        </div>
      </section>

      <section>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={formData.slug}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleInputChange}
          />
          <textarea
            name="text"
            placeholder="Text"
            value={formData.text}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="otherImages"
            placeholder="Other Images (comma separated URLs)"
            value={formData.otherImages.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                otherImages: e.target.value.split(", "),
              })
            }
          />
          <button type="submit">Upload Data</button>
        </form>
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stories/dumbo`
  );
  const data = await res.json();
  console.log(data);

  return {
    props: {
      stories: data,
      //   stories: data.stories,
      //   totalPages: data.totalPages,
    },
  };
}
