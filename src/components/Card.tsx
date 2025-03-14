/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { Heart } from "lucide-react";
import { Star } from "lucide-react";

interface IMovie {
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  original_language: string;
}

interface CardProps {
  movieData: IMovie;
}

export const Card = ({ movieData }: CardProps) => {
  const { title, vote_average, poster_path, release_date, original_language } =
    movieData;

  const [hasLiked, setHasliked] = useState(false);

  return (
    <div>
      <h2>{title}</h2>
      <Star size={16} strokeWidth={3} className="text-yellow-600" />
      <p>{vote_average}</p>
      {poster_path ? (
        <img
          src={poster_path && `https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
        />
      ) : (
        <div>
          <p>NO IMAGE</p>
        </div>
      )}

      <p>{release_date}</p>
      <p>{original_language}</p>
      <div onClick={() => setHasliked((prev) => !prev)}>
        {hasLiked ? (
          <Heart size={16} color="red" strokeWidth={3} />
        ) : (
          <Heart size={16} color="gray" strokeWidth={3} />
        )}
      </div>
    </div>
  );
};
