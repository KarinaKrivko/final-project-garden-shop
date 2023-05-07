import s from './styles.module.css'
const ToolsItem = ({ image, name, price, description }) => {
    return (
        <div className={s.grid}>
            <div className={s.image}>
                <img src={image} alt={name} />
            </div>
            <div className={s.name}>{name}</div>
            <div className={s.price}>${price}</div>
            <div className={s.description}>{description}</div>
        </div>
    );
};

export default ToolsItem;