import { useQuery } from "react-query";
import axios from "axios";
import dogNames from "dog-names";
import { generateTags, getFrase } from "../utils/dogData";
import uniqid from "uniqid";


export   function useQueryImagenes () {
    return useQuery(["queryImagenes"], queryImagenes, {
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        keepPreviousData: false,
        enabled: true,
    }
    );
}

async function queryImagenes  () {
    const { data } = await axios.get("https://dog.ceo/api/breeds/image/random"); 
       return {
        imagen: data.message,
        name: dogNames.allRandom(),
        tags: generateTags(),
        description: getFrase(),
        index: uniqid(),
    };
}