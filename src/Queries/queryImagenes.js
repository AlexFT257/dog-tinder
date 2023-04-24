import { useQuery } from "react-query";
import axios from "axios";

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
    const [queryName, paramsFilter] = params.queryKey;
    let urlBase = "";
    const { data } = await axios.get(
        urlBase + "/pokemon?limit=" + paramsFilter.limit
    );

    const resumen = data.results.map((item, index) => {
        return { label: item.name, id: index + 1 };
    });
    return resumen;
};
