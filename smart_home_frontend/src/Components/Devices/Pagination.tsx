import React from "react";
import GlassDiv from "../Shared/GlassDiv";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import "./Pagination.scss";

type Props = {};

const Pagination = (props: Props) => {
    return (
        <GlassDiv className="pagination-wrapper">
            <button className="pagination-button">{<IoIosArrowBack />}</button>
            <div className="page-text">Page 1 of 2</div>
            <button className="pagination-button">
                {<IoIosArrowForward />}
            </button>
        </GlassDiv>
    );
};

export default Pagination;
