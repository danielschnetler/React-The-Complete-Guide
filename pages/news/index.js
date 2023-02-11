import Link from "next/link";
// our-domain/news

function NewsPage() {
  return (
    <>
      <h1>The News Page</h1>
      <ul>
        <li>
          <Link href="/news/nextjs">NextJS is a great framework</Link>
        </li>
        <li>Something else</li>
      </ul>
    </>
  );
}

export default NewsPage;
