import Head from "next/head";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import useGiphySearch from "./components/useGiphySearch";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    data,
    error,
    loading,
    query,
    totalPages,
    currentPage,
    user,
    handleQueryChange,
    handleNextPage,
    handlePrevPage,
    signInWithGoogle,
    logOut,
  } = useGiphySearch();

  return (
    <>
      <Head>
        <title>Giphy</title>
        <meta name="description" content="Giphy memes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {user ? (
          <>
            <div>
              <label htmlFor="searchInput">Search:</label>
              <input
                id="searchInput"
                type="text"
                value={query}
                onChange={handleQueryChange}
              />
              {totalPages > 1 && (
                <div>
                  <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Prev
                  </button>
                  {currentPage} of {totalPages} pages
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
            <button onClick={logOut}>Sign Out </button>
            {!loading && !error && data ? (
              <div>
                {data.map((gif) => (
                  <Image
                    key={gif?.id}
                    src={gif?.images?.downsized?.url}
                    alt={gif?.title}
                    width={gif?.images?.downsized?.width}
                    height={gif?.images?.downsized?.height}
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII="
                    placeholder="blur"
                  />
                ))}
              </div>
            ) : (
              <p>{loading ? "Loading..." : error}</p>
            )}
          </>
        ) : (
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        )}
      </main>
    </>
  );
}
