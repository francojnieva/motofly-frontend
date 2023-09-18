
import { ItemProduct } from "./ItemProduct";
import BreadcrumbPages from "./Breadcrumb";

export const ListProduct = (props) =>{
const {products} = props

    return(
        <>
        <div className="container">
            <BreadcrumbPages/>
            <h1 className="text-start fw-light mb-4">Tienda</h1>
            <div className="d-flex justify-content-evenly flex-wrap">
                {products.map((product, index) => {
                        
                        return (
                        
                            <ItemProduct key={index} product={product}/>
                        );
                    })}
            </div>
        </div>
        </>
    )
}