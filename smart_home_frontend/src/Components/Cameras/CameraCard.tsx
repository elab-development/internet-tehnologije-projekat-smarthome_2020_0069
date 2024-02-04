import React, { useEffect, useState } from "react";
import CardHeader from "../Devices/CardHeader";
import GlassDiv from "../Shared/GlassDiv";
import { FaEye } from "react-icons/fa";
import "./CameraCard.scss";
import IconButton from "../Shared/IconButton";
import PopupModal from "../Shared/Modals/PopupModal";
import TextBox from "../Shared/TextBox";
import PrimaryButton from "../Shared/PrimaryButton";
import Slider from "../Shared/Slider";
import { useGetPhotos } from "../../Api/Cameras/CamerasApi";
import { SMART_HOME_API_BASE_URL } from "../../Api/ApiConfig";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Props = {
    roomName: string;
    cameraId: string;
};

const CameraCard = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [images, setImages] = useState<string[]>([]);
    const { data, isLoading, isError } = useGetPhotos(props.cameraId);

    useEffect(() => {
        if (!isLoading && !isError) {
            if (data != undefined) {
                setImages(data.paths);
            }
        }
    }, [data, isLoading]);
    return (
        <GlassDiv className="camera-card">
            <div className="latest-image-shadow"></div>
            {images.length > 0 && (
                <img
                    className="latest-image"
                    src={`${SMART_HOME_API_BASE_URL}${images[0]}`}
                    alt="camera image"
                />
            )}
            <CardHeader
                roomName={props.roomName}
                onClick={() => setIsModalOpen(true)}
            />
            <div className="view-images">
                <IconButton
                    background={true}
                    icon={<FaEye />}
                    onClick={() => {
                        setIsGalleryOpen(true);
                    }}
                />
            </div>
            <PopupModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                title="Camera settings"
            >
                <div className="camera-modal-content">
                    <TextBox placeholder="Room name" />
                    <TextBox placeholder="Capture frequency" />
                    <Slider
                        label="ISO"
                        unit=""
                        min={200}
                        max={5000}
                        onChanged={() => {}}
                        value={1200}
                    />
                    <TextBox placeholder="Resolution" />
                    <Slider
                        label="Zoom"
                        unit=""
                        min={1}
                        max={5}
                        onChanged={() => {}}
                        value={2}
                    />
                    <div className="flash-checkbox">
                        <input type="checkbox" name="flash"></input>
                        <label htmlFor="flash">Flash</label>
                    </div>
                    <div className="zoom-checkbox">
                        <input type="checkbox" name="zoom"></input>
                        <label htmlFor="zoom">Zoom</label>
                    </div>
                    <PrimaryButton button_value="Save" />
                </div>
            </PopupModal>
            <PopupModal
                isOpen={isGalleryOpen}
                onRequestClose={() => setIsGalleryOpen(false)}
                title="Gallery"
            >
                <div className="gallery-modal">
                    <img
                        src={`${SMART_HOME_API_BASE_URL}${images[currentImage]}`}
                    />
                    <div className="previous-image">
                        <IconButton
                            background={true}
                            icon={<IoIosArrowBack />}
                            onClick={() => {
                                if (currentImage == 0) {
                                    setCurrentImage(images.length - 1);
                                } else {
                                    setCurrentImage(currentImage - 1);
                                }
                            }}
                        />
                    </div>
                    <div className="next-image">
                        <IconButton
                            background={true}
                            icon={<IoIosArrowForward />}
                            onClick={() => {
                                if (currentImage == images.length - 1) {
                                    setCurrentImage(0);
                                } else {
                                    setCurrentImage(currentImage + 1);
                                }
                            }}
                        />
                    </div>
                </div>
            </PopupModal>
        </GlassDiv>
    );
};

export default CameraCard;
