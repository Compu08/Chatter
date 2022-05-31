import { BiSearchAlt } from 'react-icons/bi';
import { request, gql } from "graphql-request";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { SearchBarProps } from '../utils/types';
import React, { useEffect, useState } from 'react';
import { NotificationFailure } from './notifications';
import { FILTER_QUERY } from '../utils/gql-querys';
import { endpoint } from '../utils/gql-endpoint';

function SearchBar({ userId, chatId }: SearchBarProps) {

    const [filter, setFilter] = useState<string>("");

    const result = useQuery(["filterMsg", filter], () => {
        if(filter != "")
            return request(endpoint, FILTER_QUERY, { userId, chatId, filter })
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (chatId == "") {
            NotificationFailure("¡Error! Debes seleccionar un chat para buscar")
            setFilter("");
        }
        else {
            setFilter(e.target.value);
        }
    }

    return (
        <div id="searchBar" className="d-flex flex-column px-4 mt-3 pb-3">
            <div className="searchBar w-100 py-1 px-3 d-flex flex-row gap-2 align-items-center">
                <BiSearchAlt className="fs-5 text-chatter-black opacity-25" />
                <input type="text" className="search py-1" value={filter} placeholder="Buscar en los chats" onChange={handleInputChange} />
            </div>

            <div className="search-result">
                <div className={filter != "" ? "results text-chatter-black scale1" : "results text-chatter-black"}>
                    {result?.data?.filterMessages.map((message: any, i: any) =>
                        <div className="result" key={i}>{
                            message.message.length > 1 ? message.message : message.message.length
                        }</div>
                    )}
                </div>
            </div>
        </div>
    )

}

export default SearchBar;