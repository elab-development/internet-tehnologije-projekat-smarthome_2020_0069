import React from 'react'
import "./SongCard.scss"

type Props = {
    name: string,
    author: string,
    image: string,
    duration: number,
    onSongClick: () => void
}

const SongCard = (props: Props) => {

    return (
        
        <div className='song-card' onClick={props.onSongClick}>
            <img src={props.image} alt="album cover" />
            <div className="song-info">
                <div className="title">{props.name}</div>
                <div className="author">{props.author}</div>
            </div>
        </div>
    );

}

export default SongCard;