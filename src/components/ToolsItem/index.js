import s from './styles.module.css'
import {useState} from "react";
const ToolsItem = ({ item }) => {
    const [isAdded, setIsAdded] = useState(false);

    const addToCart = () => {
        localStorage.setItem(`product_${item.id}`, JSON.stringify(item));
        setIsAdded(true);
    };

    return (
        <div className={s.grid}>
            <div className={s.image}>
                <img src={item.image} alt="image" />
            </div>
            <div className={s.title}>{item.title}</div>
            <div className={s.price}>${item.price}</div>
            <div className={s.description}>{item.description}</div>
            <div>
                {isAdded ? (
                    <button disabled>Added to Cart</button>
                ) : (
                    <button onClick={addToCart}>Add to Cart</button>
                )}
            </div>
        </div>
    );
};

export default ToolsItem;