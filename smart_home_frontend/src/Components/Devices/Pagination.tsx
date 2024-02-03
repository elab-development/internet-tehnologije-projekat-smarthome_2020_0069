import React from "react";
import GlassDiv from "../Shared/GlassDiv";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import "./Pagination.scss";

type Props = {
    pageNumber: number,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
    haveMore: boolean;
    setHaveMore: React.Dispatch<React.SetStateAction<boolean>>
};

const Pagination = (props: Props) => {

    const increment = () => {
        if(props.haveMore){
            props.setPageNumber(props.pageNumber + 1);
        }
    };

    const decrement = () => {
        if(props.pageNumber > 1){
            props.setPageNumber(props.pageNumber - 1);
        }
    }

    return (
        <GlassDiv className="pagination-wrapper">
            <button className="pagination-button" onClick={decrement}>{<IoIosArrowBack color={ props.pageNumber !== 1 ? "white": "grey"}/>}</button>
            <div className="page-text">Page {props.pageNumber}</div>
            <button className="pagination-button"
                onClick={increment} disabled={!props.haveMore}>
                {<IoIosArrowForward color={ props.haveMore ? "white": "grey"}/>}
            </button>
        </GlassDiv>
    );
};

export default Pagination;
