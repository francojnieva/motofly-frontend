import Slider  from './Slider'
import Sales from './Sales'
import Banner from './Banner'
import  ProductPagination  from "../Components/ProductPagination"

function HomePage () {
    return (
        <div>
         <Slider />
         <Sales />
         <ProductPagination/>
         <Banner />
        
        </div>
       )
}

export default HomePage