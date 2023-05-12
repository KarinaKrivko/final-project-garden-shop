import React, { useEffect, useState } from 'react';
import {API_URL} from "../../constants";

function Bucket(props) {
    const [bucketItems, setBucketItems] = useState([]);

    useEffect(() => {
        loadBucketItems();
    }, []);

    const loadBucketItems = () => {
        const storedBucketItems = Object.keys(localStorage)
            .filter(key => key.startsWith('product_'))
            .map(key => JSON.parse(localStorage.getItem(key)));
        setBucketItems(storedBucketItems);
    };

    if (bucketItems.length <= 0) {
        return (
            <div>
                {<p>No items in the bucket.</p>}
            </div>
        );
    }

    return (
        <div>
            {<ul>
                {bucketItems.map(item => (
                    <li key={item.id}>
                        <img src={API_URL+item.image} alt={item.title} width="100"/>
                        <h3>{item.title}</h3>
                        <p>Price: ${item.price}</p>
                        <p>Discount Price: ${item.discont_price}</p>
                        <p>Description: {item.description}</p>
                        <p>Count: {item.count}</p>
                    </li>
                ))}
            </ul>}
        </div>
    );
}

export default Bucket;
