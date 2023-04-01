import { getResults } from "@/lib/getWikiResult";
import React from "react";
import Item from "./components/item";
type Props = {
  params: {
    searchTerm: string;
  };
};
export async function generateMetadata({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getResults(searchTerm);
  const data = await wikiData;
  const displayTerm = searchTerm.replaceAll("%20", " ");
  if (!data?.query?.pages) {
    return {
      title: `${displayTerm} Not Found`,
    };
  }
  return {
    title: displayTerm,
    description: `Search results for ${displayTerm}`,
  };
}
const SearchResult = async ({ params: { searchTerm } }: Props) => {
  const wikiData: Promise<SearchResult> = getResults(searchTerm);
  const data = await wikiData;
  const result: Result[] | undefined = data?.query?.pages;
  const content = (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
      {result ? (
        Object.values(result).map((items, index) => (
          <Item key={items.pageid} result={items} />
        ))
      ) : (
        <h2 className="p-2 text-xl">{`No Result Found For ${searchTerm}`}</h2>
      )}
    </main>
  );
  return content;
};

export default SearchResult;
