'use client'

import React, { FC } from 'react'
import gql from "graphql-tag";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import Loading from "@/components/loading";

type DetailsBlockProps = {
  id: string;
}

interface ILaunchInfo {
  id: string;
  details: string;
  is_tentative: boolean;
  launch_year: string;
  mission_name: string;
  rocket: {
    rocket_name: string;
    rocket_type: string;
  }
}

const query = gql`
  query getLaunch($launchId: ID!) {
    launch(id: $launchId) {
      id
      details
      is_tentative
      launch_year
      mission_name
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`
const DetailsBlock: FC<DetailsBlockProps> = ({ id }) => {
  const { data, loading, error } = useQuery<{launch: ILaunchInfo}>(query, {
    variables: { launchId: id },
    fetchPolicy: 'cache-and-network',
  });

  return (
   <div className="h-[100%]">
     {error && <p>Something went wrong!</p>}
     {loading && !data && <div className="relative h-[100%]"><Loading/></div>}
     {data && (
       <div className="flex flex-col text-left p-8">
         <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Launch details:</h2>
         <span className="min-h-[30px] text-gray-900 dark:text-white">Mission name - <span className="italic text-gray-500">{data.launch.mission_name}</span></span>
         <span className="min-h-[30px] text-gray-900 dark:text-white">Is tentative -  <span
           className="italic text-gray-500">{data.launch.is_tentative ? 'yes' : 'no'}</span></span>
         <span className="min-h-[30px] text-gray-900 dark:text-white">Launch Year -  <span className="italic text-gray-500">{data.launch.launch_year}</span></span>
         <span className="min-h-[30px] text-gray-900 dark:text-white">Details - <span className="italic text-gray-500">{data.launch.details}</span></span>
         <span className="min-h-[30px] text-gray-900 dark:text-white">Rocket name - <span
           className="italic text-gray-500">{data.launch.rocket.rocket_name}</span></span>
         <span className="min-h-[30px] text-gray-900 dark:text-white">Rocket type - <span
           className="italic text-gray-500">{data.launch.rocket.rocket_type}</span></span>
       </div>
     )}
   </div>
  )
}
export default DetailsBlock;