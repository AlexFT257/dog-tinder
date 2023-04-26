import { useQuery } from "react-query";
import axios from "axios";
import dogNames from "dog-names";


export function useQueryImagenes (params) {
    return useQuery(["queryImagenes", params], queryImagenes, {
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        keepPreviousData: false,
        enabled: true,
    }
    );
}

export const queryImagenes = async (params) => {
    const { response } = await axios.get("https://dog.ceo/api/breeds/image/random");
    return { imagen: response.message , nombre: "Te odio react query" };
}
