import { useQuery } from "react-query";
import axios from "axios";
import dogNames from "dog-names";

export function uuseBuscarImagenQuery(params) {
    return useQuery(
        ["buscarImagenQuery", params],
        buscarImagenQuery, {
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        keepPreviousData: false,
        enabled: true,
    });
}

export const buscarImagenQuery = async (params) => {
    let urlBase = "https://dog.ceo/api/breeds/image/random";
    const { data } = await axios.get(urlBase);

    const resumen = data.results.map((item, index) => {
        return {
            index:  perroActual.index + 1,
            name: dogNames.allRandom(),
            image: item.data.message,
        };
    });
    return resumen;
};
