import React from 'react';
type Props = {
    type: string;
    size?: number;
};
const CoinIcon = ({ type, size }: Props) => {
    try {
        const iconSrc = require(`../../static/coinIcons/${type.toLowerCase()}.svg`);

        return <img width={size || 32} src={iconSrc} alt={type} />;
    } catch (error) {
        return <div></div>;
    }
};

export default CoinIcon;
