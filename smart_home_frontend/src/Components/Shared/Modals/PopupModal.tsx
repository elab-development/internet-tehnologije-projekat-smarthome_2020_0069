import React, { ReactNode } from "react";
import Modal from "react-modal";
import "./PopupModal.scss";
import { IoIosClose } from "react-icons/io";

type Props = {
    isOpen: boolean;
    onRequestClose: () => void;
    children?: React.ReactNode;
    title?: string;
    width?: string;
    height?: string;
};

const PopupModal = (props: Props) => {
    return (
        <div className="modal-wrapper">
            <Modal
                isOpen={props.isOpen}
                overlayClassName="modal-overlay"
                className="modal-content"
                style={
                    {
                        content:{
                            width: props.width != null ? props.width : "",
                            height: props.height != null ? props.height : ""
                        }
                    }
                }
            >
                <div className="modal-header">
                    <button
                        className="header-button"
                        onClick={props.onRequestClose}
                    >
                        <IoIosClose />
                    </button>
                    <span>{props.title}</span>
                    <div></div>
                </div>
                {props.children}
            </Modal>
        </div>
    );
};

export default PopupModal;
