import { useState } from "react";
import { NavLink } from "react-router-dom";
import EditBoardModal from "../EditBoardModal/EditBoardModal";
import { useDispatch } from "react-redux";
import { deleteBoard } from "../../redux/boards/operations";
import { setCurrentBoardId } from "../../redux/boards/slice";
import toast from "react-hot-toast";

import svg from "../../img/icons.svg";
import css from "./Board.module.css";
import clsx from "clsx";

export default function Board({ board }) {
  const { _id, title, icon, background } = board;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const boardDeleteNotify = () =>
    toast.error(`You deleted the board ${board.title}`);

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteBoard(_id));
    boardDeleteNotify();
  };

  const openModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    dispatch(setCurrentBoardId(_id));
  };

  const linkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.activeLink);
  };

  return (
    <div className={css.linkWrapper}>
      {/* <NavLink to={`/home/${_id}`} className={linkClass} onClick={handleClick}> */}
      <div className={css.titleWrapper}>
        <svg className={css.titleIcon} width="18px" height="18px">
          <use href={`${svg}#${icon}`} />
        </svg>
        <h3 className={css.title}>{title}</h3>
      </div>
      <div className={css.btns}>
        <button className={css.btn} type="button" onClick={openModal}>
          <svg className={css.icon} width="16px" height="16px">
            <use href={svg + "#icon-pencil"}></use>
          </svg>
        </button>
        <button className={css.btn} type="button" onClick={handleDelete}>
          <svg className={css.icon} width="16px" height="16px">
            <use href={svg + "#icon-trash"}></use>
          </svg>
        </button>
      </div>
      {/* </NavLink> */}
      {isModalOpen && (
        <EditBoardModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={title}
          icon={icon}
          boardId={_id}
          background={background}
        />
      )}
    </div>
  );
}
