import React from "react"
import { getInitials } from "../../utils/helper";

const CharAvatar = ({fullName, width, height, style}) => {

    return (
        <div 
            className={`${width ||'w-12'} ${height ||'w-12'} ${style ||''} 
            flex items-center justify-center rounded-full text-gray-900 font-meduim bg-gray-100`}
        >
            {getInitials(fullName || '')}
        </div>
    );
};
export default CharAvatar;