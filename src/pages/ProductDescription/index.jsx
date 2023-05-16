import React from 'react';
import ProductDescription from '../../components/ProductDescription';

function ProductDescriptionPage(props) {
    return (
        <div>
            <ProductDescription match={props.match} />
        </div>
    );
}

export default ProductDescriptionPage;