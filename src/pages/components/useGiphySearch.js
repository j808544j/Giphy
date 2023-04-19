import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import app from "../../../firebase";
import Cookies from "js-cookie";

function useGiphySearch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [searchClicked, setSearchClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    async function fetchData() {
      if (!searchClicked) {
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_GIPHY_API}${process.env.NEXT_PUBLIC_GIPHY_KEY}&limit=${limit}&q=${query}&offset=${offset}`
        );
        const data = await res.json();
        if (data?.meta?.status !== 200) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }
        setData(data?.data);
        setTotalPages(data?.pagination?.total_count);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [limit, query, searchClicked, offset]);

  function handleQueryChange(event) {
    setQuery(event.target.value);
    setSearchClicked(false);
  }

  function handleSearchClick() {
    setCurrentPage(1);
    setOffset(0);
    setSearchClicked(true);
  }

  function handleNextPage() {
    setCurrentPage((currentPage) => currentPage + 1);
    setOffset((offset) => offset + limit);
  }

  function handlePrevPage() {
    setCurrentPage((currentPage) => currentPage - 1);
    setOffset((offset) => offset - limit);
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {})
      .catch((error) => {
        const errorMessage = error.message;
        const email = error.email;
        setError(`Error while signin using ${email} - ${errorMessage} `);
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        setError(error);
      });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      Cookies.set("user", JSON.stringify(user));
    } else {
      setUser(null);
      Cookies.remove("user");
    }
  });

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  return {
    data,
    error,
    loading,
    query,
    limit,
    offset,
    totalPages,
    currentPage,
    user,
    handleQueryChange,
    handleSearchClick,
    handleNextPage,
    handlePrevPage,
    signInWithGoogle,
    logOut,
  };
}

export default useGiphySearch;
