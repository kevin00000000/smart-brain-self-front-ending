import React from 'react';

const StatusInfo = ({name, entries}) => {
    return (
        <div>
            <p className="white f3">{`${name}, your current entry count is...`}</p>
            <p className="white f1">{entries}</p>
        </div>
    )
}

export default StatusInfo;