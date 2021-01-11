import { Layout } from '../components/layout-components';
import { getAllBooks } from '../utils/bibleConnector';

const Books = (props) => {
  const books = props.books;

  return (
    <Layout>
      <h1>Books List</h1>
      <ul>
        {books.map((book, index) => {
          return <li>{book.name}</li>
        })}
      </ul>
    </Layout>
  )
}

export async function getServerSideProps() {
  // Make server-side API call

  const res = await getAllBooks(`06125adad2d5898a-01`);

  return {
    props: {
      books: res.data,
    }
  }
}

export default Books;