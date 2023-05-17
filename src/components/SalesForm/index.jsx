import React, {useState} from "react";
import s from "./styles.module.css";
import gnome from "./media/gnome.png";
import ReactModal from "react-modal";
import {useMediaQuery} from "@mui/material";
import * as PropTypes from "prop-types";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {postSale} from "../../actions/saleAction";

function SalesForm(props) {
    const [isOpen, setIsOpen] = useState(false);
    const isSmallScreen = useMediaQuery("(max-width: 768px)");
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .matches(/^\+\d{1,3}\d{9,15}$/, "Invalid phone number. " +
                "Please type in the format: +(country code) (number)'.")
            .required("Phone number is required"),
    });

    const handleClick = async (values, actions) => {
        actions.setSubmitting(false);
        try {
           await dispatch(postSale(JSON.stringify(values)));
        } catch (error) {
            setIsOpen(true);
        } finally {
            setIsOpen(true);
        }
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    if (isSmallScreen) return <></>

    return (
        <div className={s.container}>
            <img className={s.gnome} src={gnome} alt="gnome"/>
            <div className={s.block}>
                <p className={s.discount}>5% off</p>
                <p className={s.firstOrder}>on the first order</p>
                <div className={s.btns}>
                    <div>
                        <Formik
                            initialValues={{phoneNumber: ""}}
                            validationSchema={validationSchema}
                            onSubmit={handleClick}
                        >
                            {({isSubmitting}) => (
                                <Form >
                                    <Field
                                        className={s.tel}
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="+49 (000) 000 00 000  "
                                    />
                                    <ErrorMessage
                                        name="phoneNumber"
                                        component="div"
                                        className={s.error}
                                    />
                                    <button className={s.discount_btn} disabled={isSubmitting} onClick={handleClick}>
                                        Get Discount
                                    </button>
                                </Form>
                            )}
                        </Formik>

                        <DiscountRequestModal open={isOpen} onRequestClose={handleCloseModal}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesForm;

function DiscountRequestModal(props) {
    return <ReactModal
        isOpen={props.open}
        onRequestClose={props.onRequestClose}
        className={s.modal}
        contentLabel="Discount Modal"
        ariaHideApp={false}
    >
        <h4 className={s.customer}>Dear Customer,</h4>
        <div>
            <p className={s.main_text}>
                Thanks a lot for your request, you will get your code with
                DISCOUNT shortly. Please check your email. If you don't find
                the email in a few minutes, please check your “junk mail” or
                “spam” folder. If you still don’t receive an email from us,
                don't hesitate to contact us, please use the number below:
            </p>
            <p className={s.phone}> 24/7 Service phone: <br></br> +7 999 999 99 99</p>
            <p className={s.main_text}>
                We will do our best to answer all your requests as soon as
                possible. Have a good day!
            </p>
            <p className={s.wishes}>Sincerely Yours, GardenShop</p>
            <button className={s.close_btn} onClick={props.onRequestClose}>
                Close
            </button>
        </div>
    </ReactModal>;
}

DiscountRequestModal.propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func
};

