import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import { getArticles } from "@/sanity/schemas/sanity-utils";
import { ArticlesProps } from "@/types/Articles";
import { FeaturedArticles } from "@/components/articles";
import { AnimatedText } from "@/components/common";

const articles: React.FC<ArticlesProps> = ({ articles }) => {
  return (
    <>
      <Head>
        <title>Articles | Marow Macaulay</title>
      </Head>
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden">
        <Layout className="pt-16">
          <AnimatedText
            text="Words are medicine to the soul!"
            className="text-6xl mb-16"
            textWrapper="text-center"
          />
          <ul className="grid grid-cols-2 gap-16">
            {articles.map(({ name, url, summary, image, duration }, idx) => (
              <FeaturedArticles
                link={url}
                title={name}
                imgSrc={image}
                summary={summary}
                duration={duration}
                key={idx}
              />
            ))}
          </ul>
        </Layout>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const articles = await getArticles();

  return {
    props: {
      articles,
    },
  };
}

export default articles;
