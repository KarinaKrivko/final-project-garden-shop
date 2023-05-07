import React, { useEffect, useState } from 'react';

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

    return (
        <div>
            {bucketItems.length > 0 ? (
                <ul>
                    {bucketItems.map(item => (
                        <li key={item.id}>
                            <img src={item.image} alt={item.title} width="100" />
                            <h3>{item.title}</h3>
                            <p>Price: ${item.price}</p>
                            <p>Discount Price: ${item.discont_price}</p>
                            <p>Description: {item.description}</p>
                            <p>Count: {item.count}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items in the bucket.</p>
            )}
        </div>
    );
}

export default Bucket;
