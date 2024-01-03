"use client"

import React, {useCallback, useState} from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import DetailsBlock from "@/components/details-block";

export default function Home() {
  return (
    <div className="h-[calc(100%-80px)] p-8">
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
          {itemId ? <DetailsBlock id={itemId} /> : (
            <span className="flex justify-center h-full">
              Please select one of the items to see the details!
            </span>
          )}
        </div>
      </div>

    </div>
  )
}

