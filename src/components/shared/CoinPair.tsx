import React from 'react';
import styled from 'styled-components';
import CoinIcon from './CoinIcon';

type Props = {
    base: string;
    quote: string;
    coinSize?: number;
    textSize?: string;
};
const CoinPair = ({ base, quote, coinSize = 20, textSize }: Props) => {
    return (
        <Cointainer textSize={textSize}>
            <CoinIcon type={base} size={coinSize} /> {base} / <CoinIcon type={quote} size={coinSize} /> {quote}
        </Cointainer>
    );
};

type ContainerProps = {
    textSize?: string;
};
const Cointainer = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    font-size: ${(props) => props.textSize || props.theme.textSize.default};
    text-align: center;

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
