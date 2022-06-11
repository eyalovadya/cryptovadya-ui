import React from 'react';
import styled from 'styled-components';
import CoinIcon from './CoinIcon';

type Props = {
    base: string;
    quote: string;
    coinSize?: number;
    textSize?: string;
    height?: number;
};
const CoinPair = ({ base, quote, coinSize = 20, textSize, height }: Props) => {
    return (
        <Cointainer textSize={textSize} height={height}>
            <CoinIcon type={base} size={coinSize} /> {base} / <CoinIcon type={quote} size={coinSize} /> {quote}
        </Cointainer>
    );
};

type ContainerProps = {
    textSize?: string;
    height?: number;
};
const Cointainer = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    font-size: ${(props) => props.textSize || props.theme.textSize.default};
    height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
    text-align: center;
    box-sizing: border-box;
    img {
        margin: 0 4px;
        top: 0.1em;
        position: relative;
    }

    img:first-of-type {
        margin-left: 0;
    }
`;

export default CoinPair;
