import Modal from "react-modal";
import svg from "../../img/icons.svg";
import css from "./ModalHelp.module.css";
import * as Yup from "yup";
import toast from "react-hot-toast";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { sendHelpMessage } from "../../redux/boards/operations";

export default function ModalHelp({ isOpen, closeModal }) {
  const dispatch = useDispatch();

  const ValidEditionSchema = Yup.object().shape({
    email: Yup.string()
      .min(1, "Too Short Email!")
      .max(35, "Too Long Email!")
      .required("Required"),
    comment: Yup.string()
      .min(1, "Too Short Coment!")
      .max(300, "Too Long Coment!")
      .required("Required"),
  });
  const Notify = () => toast.success("You send message");

  const handleSubmit = (values, actions) => {
    const newMessage = {
      email: values.email,
      comment: values.comment,
    };
    console.log(newMessage);
    actions.resetForm();
    dispatch(sendHelpMessage(newMessage));
    Notify();
    closeModal();
  };
  return (
    <Modal
      overlayClassName={css.overlay}
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Help Modal"
    >
      <h2 className={css.title}>Need help</h2>
      <svg className={css.icon} onClick={closeModal} width="18px" height="18px">
        <use className={css.icon} href={svg + "#x-close"}></use>
      </svg>
      <Formik
        initialValues={{ email: "", comment: "" }}
        onSubmit={handleSubmit}
        validationSchema={ValidEditionSchema}
      >
        <Form autoComplete="off">
          <Field
            className={css.input}
            type="email"
            name="email"
            placeholder="Email address "
          />
          <ErrorMessage
            name="email"
            component="div"
            className={css.errorMessage}
          />
          <Field
            className={css.inputText}
            type="text"
            name="comment"
            placeholder="Comment"
            rows="5"
            component="textarea"
          />
          <ErrorMessage
            name="comment"
            component="div"
            className={css.errorMessage}
          />
          <button className={css.button} type="submit">
            Send
          </button>
        </Form>
      </Formik>
    </Modal>
  );
}
