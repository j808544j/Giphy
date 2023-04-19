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
    limit,
    handleQueryChange,
    handleSearchClick,
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
        <div>
          <label htmlFor="searchInput">Search:</label>
          <input
            id="searchInput"
            type="text"
            value={query}
            onChange={handleQueryChange}
          />
          <button onClick={handleSearchClick}>Search</button>
          <p>You are searching for: {query}</p>
        </div>
        {!loading && !error && data ? (
          <div>
            {data.map((gif) => (
              <Image
                key={gif?.id}
                src={gif?.images?.downsized?.url}
                alt={gif?.title}
                width={gif?.images?.downsized?.width}
                height={gif?.images?.downsized?.height}
              />
            ))}
          </div>
        ) : (
          <p>{loading ? "Loading..." : error}</p>
        )}
      </main>
    </>
  );
}
