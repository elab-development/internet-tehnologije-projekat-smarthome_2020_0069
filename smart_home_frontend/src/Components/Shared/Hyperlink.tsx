import React, { HtmlHTMLAttributes } from 'react'
import Link from 'react-router-dom'
import "./Hyperlink.scss"
import { LoginPages } from '../../Pages/Login';

type Props = {
    onclick: React.MouseEventHandler<HTMLAnchorElement> | undefined;
    link?: string;
    name: string;
};

const Hyperlink = (props: Props) => {

    return (
        <div className='hyperlink'>
            <a href={props.link} onClick={props.onclick}>{props.name}</a>
        </div>
    );

};


export default Hyperlink;