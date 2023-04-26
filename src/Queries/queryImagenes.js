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

<<<<<<< Updated upstream
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
=======
export const queryImagenes = async (params) => {
    const { response } = await axios.get("https://dog.ceo/api/breeds/image/random");
    return { imagen: response.message , nombre: "Te odio react query" };
}
>>>>>>> Stashed changes
