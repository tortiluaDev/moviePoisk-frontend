import Image from "next/image";
import styles from "../moviePage.module.scss";
import { Calendar, Star, Ticket } from "lucide-react";

interface Props {
  imgSrc: string;
  title: string;
  genre: string;
  releaseDate: string;
  voteAvg: number;
}

export function MovieInfo({
  imgSrc,
  title,
  genre,
  releaseDate,
  voteAvg,
}: Props) {
  return (
    <div className={styles.info}>
      <Image src={imgSrc} alt={title} width={220} height={300} />
      <div>
        <h1>{title}</h1>
        <ul>
          <li>
            <Calendar />
            <p>{releaseDate}</p>
          </li>
          <li>
            <Star />
            <p>{voteAvg}</p>
          </li>
          <li>
            <Ticket />
            <p>{genre}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
