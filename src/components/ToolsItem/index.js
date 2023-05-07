import s from './styles.module.css'
import {useState} from "react";
import * as PropTypes from "prop-types";

function ToolsItem(props) {
    let {item} = props;
    const [isAdded, setIsAdded] = useState(false);
    const backendHost="http://localhost:3333/"

    const addToCart = () => {
        localStorage.setItem(`product_${item.id}`, JSON.stringify(item));
        setIsAdded(true);
    };

    return (
        <div className={s.grid}>
            <div className={s.image}>
                <img src={backendHost+item.image} alt="image"/>
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
}

ToolsItem.propTypes = {item: PropTypes.any}

export default ToolsItem;