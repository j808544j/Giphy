import { useState, useEffect } from "react";

function useGiphySearch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!searchClicked) {
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_GIPHY_API}${process.env.NEXT_PUBLIC_GIPHY_KEY}&limit=${limit}&q=${query}`
        );
        const data = await res.json();
        if (data?.meta?.status !== 200) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }
        setData(data?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [limit, query, searchClicked]);

  function handleQueryChange(event) {
    setQuery(event.target.value);
    setSearchClicked(false);
  }

  function handleSearchClick() {
    setSearchClicked(true);
  }

  return {
    data,
    error,
    loading,
    query,
    limit,
    offset,
    handleQueryChange,
    handleSearchClick,
  };
}

export default useGiphySearch;
