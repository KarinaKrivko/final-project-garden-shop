import React, { useState } from "react";
import s from "./styles.module.css";
import gnome from "./media/gnome.png";
import ReactModal from "react-modal";

function SalesForm(props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={s.container}>
      <img className={s.gnome} src={gnome} alt="gnome" />
      <div className={s.block}>
        <p className={s.discount}>5% off</p>
        <p className={s.firstOrder}>on the first order</p>
        <div className={s.btns}>
          <input className={s.tel} type="tel" placeholder="       +49"></input>
          <div>
            <button className={s.discount_btn} onClick={handleClick}>
              Get Discount
            </button>
            <ReactModal
              isOpen={isOpen}
              onRequestClose={handleCloseModal}
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
                <button className={s.close_btn} onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </ReactModal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesForm;
