import Link from "next/link";
import { Layout } from "../../components/layout-components";
import { BibleContent, BibleCopyright } from "../../components/read";
import { getChapter } from "../../utils/bibleConnector";
import Error from "next/error";

/**
 * Loads the chapter in a readable page view
 * @param {*} props 
 */
const Chapter = (props) => {
  const chapter = props.chapter;
  if (!chapter) return <Error statusCode={404} />;
  const reference = chapter.reference;
  const content = chapter.content;
  // The reference format varies by version and is hard to string manipulate. 
  // Eventually it would be nice to query the DB and add just the chapter name.
  const chapterName = reference;
  const chapterNumber = chapter.number;
  const versionIdFromQuery = props.query.version;
  return <Layout
    {...props}
    title={`Read ${reference}`}>
    <Link
      href={`/book/${chapter.bookId}?version=${versionIdFromQuery}`}
      className="chapters">
      &larr; Chapters
    </Link>
    <h1>{chapterName}</h1>
    <main className="read">
      <BibleContent
        content={content}
        chapterNumber={chapterNumber} />
    </main>
    <nav
      className="chapter-nav">
      {chapter.previous
        && <Link
          href={`/chapter/${chapter.previous.id}?version=${versionIdFromQuery}`}>
          &larr;&nbsp;&nbsp;Previous
        </Link>}
      {chapter.next
        && <Link
          href={`/chapter/${chapter.next.id}?version=${versionIdFromQuery}`}>
          Next&nbsp;&nbsp;&rarr;
        </Link>}
    </nav>
    {chapter.copyright
      && <BibleCopyright
        copyright={chapter.copyright} />
    }
    <style jsx>{`
      .chapters {
        margin-block: 1em;
      }
      .chapter-nav {
        display: flex;
        gap: 2rem;
        justify-content: center;
        flex-wrap: row wrap;
        margin-top: 6rem;
      }
    `}</style>
  </Layout>
}

export async function getServerSideProps(ctx) {
  const query = ctx.query;
  let chapter = null;
  if (query.version) {
    chapter = await getChapter(query)
      .then(res => res.json())
      .then(json => json.data)
      .catch(res => console.error(`An error occurred in getChapter(). ${res.error}`));
  }
  return { props: { query: query, chapter: chapter } }
}

export default Chapter;
