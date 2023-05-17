import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import s from "./styles.module.css";
import React, {useState} from "react";
import * as PropTypes from "prop-types";
import _ from "lodash";
import {postOrder} from "../../actions/orderAction";
import {useDispatch} from "react-redux";
import ReactModal from "react-modal";

function ValidationForm(props) {
    const dispatch = useDispatch();
    let {total} = props;

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [list, setList] = useState([]);


    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .matches(/^\+\d{1,3}\d{9,15}$/, "Invalid phone number. Please provide a valid number in the format '+{country code} {number}'.")
            .required("Phone number is required"),
    });


    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        const localStorageData = _.mapValues(localStorage, (el) => JSON.parse(el));
        const list = _.values(localStorageData).filter(it=>_.isObject(it));
        setList(list)

        try {
            const response = await dispatch(postOrder(JSON.stringify(localStorageData)));
            setModalMessage(JSON.stringify(response.status));
        } catch (error) {
            setModalMessage(error.message);
            setModalOpen(true);
        } finally {
            setModalOpen(true);
        }
    }

    const closeModal = () => {
        setModalOpen(false);
        setModalMessage('');
        localStorage.clear();
    };

    if (!total) {
        return <div></div>
    }

    return (
        <div data-testid="validation-form">
            <Formik
                initialValues={{phoneNumber: ""}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form className={s.form}>
                        <p className={s.order}>Order details</p>
                        <span className={s.total}>Total: {total}</span>
                        <Field
                            className={s.input}
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone number"
                        />
                        <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className={s.error}
                        />
                        <button className={s.btn} type="submit" disabled={isSubmitting}>
                            Order
                        </button>
                    </Form>
                )}
            </Formik>
            <ResponseDialog isOpen={modalOpen} message={modalMessage} onClose={closeModal} list={list}/>
        </div>
    );
}

export default ValidationForm;

function ResponseDialog({isOpen, message, onClose, list}) {


    return (
        <ReactModal
            isOpen={isOpen}
            className={s.resultModal}
            onRequestClose={onClose}
            contentLabel="ORDER REQUESTED"
            ariaHideApp={false}
        >
            <h3 data-testid="order-title">ORDER REQUESTED</h3>
            <h4 data-testid="order-status">Status: {message}</h4>
            <div>
                {list.map((product) => (
                    <div  key={product.data.id}>
                        {product.data.title}
                     </div>
                ))}
            </div>
        </ReactModal>
    );
}

ValidationForm.propTypes = {
    total: PropTypes.any
}
