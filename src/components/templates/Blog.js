import React, { FunctionComponent } from 'react';
import { graphql, Link } from 'gatsby';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  connectStateResults,
  ScrollTo,
} from 'react-instantsearch-dom';

import Layout from '../Hoc/Layout';
import SEO from '../SEO/SEO';
import Pagination from '../UI/Pagination/Pagination';
import SearchBox from '../UI/SearchBox/SearchBox';
import BlogCard from '../BlogCard/BlogCard';

const LoadingIndicator = connectStateResults(
  ({ isSearchStalled, searchResults, error }) => (
    <h4>
      {!error ? (
        isSearchStalled ? (
          'Loading...'
        ) : searchResults?.nbHits ? null : (
          'No results found.'
        )
      ) : (
        <p style={{ color: 'red' }}>{error.message}</p>
      )}
    </h4>
  )
);
const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);
const Blog = () => {
  return (
    <Layout id="Layout">
      <SEO title="Blog" />
      <main>
        <InstantSearch searchClient={searchClient} indexName="blog">
          <ScrollTo>
            <SearchBox />
          </ScrollTo>
          <LoadingIndicator />
          <Hits hitComponent={BlogCard} />
          <Pagination />
        </InstantSearch>
      </main>
    </Layout>
  );
};

export default Blog;

export const blogQuery = graphql`
  query($id: String) {
    site(id: { eq: $id }) {
      id
    }
  }
`;
