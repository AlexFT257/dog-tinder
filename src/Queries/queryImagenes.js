import { useQuery } from "react-query";
import dogNames from "dog-names";


export function useQueryImagenes(params) {
    return useQuery(["queryImagenes", params], queryImagenes, {
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        keepPreviousData: false,
        enabled: true,
    }
    );
}

async function queryImagenes(params) {
    return await fetch("https://dog.ceo/api/breeds/image/random").then((response) => {
        return response.json();
    }).then((data) => {
        console.log("data", data);
        return {dogName: dogNames.allRandom(), dogImage: data};
    });
}
