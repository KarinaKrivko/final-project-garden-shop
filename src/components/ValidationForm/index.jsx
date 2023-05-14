import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import s from "./styles.module.css";
import React from "react";
import * as PropTypes from "prop-types";

function ValidationForm(props) {
    let {total} = props;
    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .matches(/^\+\d{1,3}\d{9,15}$/, "Invalid telephone number. Please provide a valid phone number in the format '+{country code} {number}'.")
            .required("Phone number is required"),
    });

    if (!total) {
        return <div></div>
    }

    return (
        <div>
            <Formik
                initialValues={{phoneNumber: ""}}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
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
        </div>
    );
}

export default ValidationForm;

ValidationForm.propTypes = {
    total: PropTypes.any
}
