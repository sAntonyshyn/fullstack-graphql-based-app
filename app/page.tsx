"use client"

import React, {useCallback, useState} from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import DetailsBlock from "@/components/details-block";

const query = gql`
  query getLaunches($limit: Int, $offset: Int) {
  launches(limit: $limit, offset: $offset) {
    mission_name
    id
  }
}
`

interface ILaunch {
  id: string;
  mission_name: string;
  __typename: string;
}

const SIZE = 50;
const Home = () => {
  const { data, loading, error, fetchMore } = useQuery<{launches: ILaunch[]}>(query, {
    variables: { limit: SIZE, offset: 0 },
  });
  const [itemId, setItemId] = useState('')

  const handleScroll = ({ currentTarget }: React.UIEvent<HTMLUListElement, UIEvent>, onLoadMore: () => void) => {
    if (
      currentTarget.scrollTop + currentTarget.clientHeight >=
      currentTarget.scrollHeight - 50
    ) {
      onLoadMore();
    }
  };

  const onLoadMore = useCallback(() => {
    if (!data) return;

    fetchMore({
      variables: {
        offset: data.launches.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          launches: [...prev.launches, ...fetchMoreResult.launches]
        });
      }
    })
  }, [data, fetchMore])
  return (
    <div className="h-[calc(100%-80px)] p-8">
      <h1
        className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Space X launches
      </h1>
      <div className="h-[100%] flex gap-8">
        <div className="flex-1 flex-shrink-2 flex-grow-1 text-center border-2 border-solid border-green-500">
          {error && <p>Something went wrong!</p>}
          {loading && !data && <p>Loading...</p>}
          {data && <ul
              className="h-[100%] overflow-auto flex flex-col"
              onScroll={e => handleScroll(e, onLoadMore)}
          >{data.launches?.map((item) => {
            const isSelected = itemId === item.id;
            return (
              <li
                key={item.id}
                onClick={() => setItemId(item.id)}
                className={`flex gap-2 justify-center cursor-pointer min-h-[30px] items-center ${isSelected ? 'bg-orange-400' : ''}`}
              >
                <div>{item.mission_name}</div>
              </li>
            )
          })}
          </ul>}
        </div>
        <div className="flex-1 flex-shrink-2 flex-grow-1 text-center border-2 border-solid border-green-500">
          {itemId ? <DetailsBlock id={itemId}/> : (
            <span className="flex justify-center h-full">
              Please select one of the items to see the details!
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home

