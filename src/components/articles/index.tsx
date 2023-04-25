import { FeaturedArticlesInterface } from "@/types/Articles";
import Link from "next/link";
import { FramerImage } from "../common";

const FeaturedArticles: React.FC<FeaturedArticlesInterface> = ({
  link,
  imgSrc,
  title,
  duration,
  summary,
}) => {
  return (
    <li className="col-span-1 w-full p-4 bg-light border border-dark border-solid rounded-2xl">
      <Link
        href={link}
        target="_blank"
        className="cursor-pointer overflow-hidden rounded-lg inline-block"
      >
        <FramerImage
          src={imgSrc}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          width={450}
          height={200}
        />
      </Link>
      <Link href={link} target="_blank">
        <h2 className="capitalize text-2xl font-bold my-2 hover:underline">
          {title}
        </h2>
      </Link>
      <p className="text-sm mb-2">{summary}</p>
      <span className="text-primary font-semibold">{duration}</span>
    </li>
  );
};

export { FeaturedArticles };
