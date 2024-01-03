'use client'

import React, { FC } from 'react'
import gql from "graphql-tag";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

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
  });

  return (
   <div>
     {error && <p>Something went wrong!</p>}
     {loading && !data && <p>Loading...</p>}
     {data && (
       <div className="flex flex-col text-left p-8">
         <span className="min-h-[30px]">Mission name - <span className="italic">{data.launch.mission_name}</span></span>
         <span className="min-h-[30px]">Is tentative -  <span className="italic">{data.launch.is_tentative ? 'yes' : 'no'}</span></span>
         <span className="min-h-[30px]">Launch Year -  <span className="italic">{data.launch.launch_year}</span></span>
         <span className="min-h-[30px]">Details - <span className="italic">{data.launch.details}</span></span>
         <span className="min-h-[30px]">Rocket name - <span className="italic">{data.launch.rocket.rocket_name}</span></span>
         <span className="min-h-[30px]">Rocket type - <span className="italic">{data.launch.rocket.rocket_type}</span></span>
       </div>
     )}
   </div>
  )
}
export default DetailsBlock;