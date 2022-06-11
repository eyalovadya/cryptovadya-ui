import styled from 'styled-components';
import { baseCardStyle } from '../../../../../../shared/styles';
import { Widget } from '../../../../../../types/dashboards/widget';
import CoinPair from '../../../../../shared/CoinPair';

type Props = {
    widget: Widget<'STAT_CARD'>;
    subtitle: string;
};
const StatCard = ({ widget, subtitle }: Props) => {
    const { baseCurrency, quoteCurrency, data, dayDiffPrecent } = widget.data;

    const isDiffPositive = dayDiffPrecent > 0;
    const valueDiff = (data * dayDiffPrecent) / 100;
    const diffSign = isDiffPositive ? '+' : '';

    return (
        <Container>
            <Content>
                <Title>
                    <CoinPair base={baseCurrency} quote={quoteCurrency} coinSize={20} textSize="16px" />
                </Title>
                <DataContainer>
                    <Data>{data.toFixed(2)}</Data>
                    <Diff isPositive={isDiffPositive}>
                        {diffSign}
                        {valueDiff.toFixed(2)} ({diffSign}
                        {dayDiffPrecent.toFixed(2)}%)
                    </Diff>
                </DataContainer>
            </Content>
            <Subtitle>{subtitle}</Subtitle>
        </Container>
    );
};

const Container = styled.div`
    ${baseCardStyle}
    width: 300px;
    height: 100px;
    justify-content: space-between;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Title = styled.div``;

const Subtitle = styled.div`
    font-size: ${(props) => props.theme.textSize.small};
    color: #919191;
`;

const DataContainer = styled.div`
    display: flex;
    align-items: baseline;
`;

const Data = styled.div``;

type DiffProps = {
    isPositive: boolean;
};
const Diff = styled.div<DiffProps>`
    margin-left: 5px;
    font-size: ${(props) => props.theme.textSize.small};
    color: ${(props) => (props.isPositive ? '#54a271' : '#db5757')};
`;

export default StatCard;
