import { useEffect, useState } from "react";
import { getProducts } from "../../asyncMock";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";

export const ItemListContainer = ({ greeting }) => {
    const { category } = useParams()
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true);
        getProducts()
            .then((resp) => {
                if (category) {
                    const productsFilter = resp.filter(product => product.category === category);
                    setProducts(productsFilter);
                    setIsLoading(false);
                } else {
                    setProducts(resp);
                    setIsLoading(false);
                }
            })
            .catch((error) => console.log(error));
    }, [category]);

    return (
        <>
            <div> {greeting} </div>
            {isLoading ? <div className="fs-3 text-center p-3"> Cargando productos, gracias por la paciencia :)
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                    </div>
                </div> </div> : <ItemList products={products} />}

        </>
    );
};
