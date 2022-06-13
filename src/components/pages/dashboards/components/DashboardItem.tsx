import styled from 'styled-components';
import { Dashboard } from '../../../../types/dashboards';
import { baseCardStyle } from '../../../../shared/styles';
import CoinPair from '../../../shared/CoinPair';
import { useMediaQuery } from 'react-responsive';

type Props = {
    dashboard: Dashboard;
};

const DashboardItem = ({ dashboard }: Props) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <DashboardItemStyle padding="0">
            <Title>{dashboard.title}</Title>
            <Content>
                {!!dashboard.widgets.length ? (
                    <Widgets>
                        {dashboard.widgets.map((widget) => {
                            if (widget.type === 'STAT_CARD') {
                                const { baseCurrency, quoteCurrency } = widget.data;
                                return (
                                    <WidgetWrapper key={widget.id}>
                                        <CoinPair key={widget.id} base={baseCurrency} quote={quoteCurrency} coinSize={isMobile ? 15 : 20} />
                                    </WidgetWrapper>
                                );
                            }
                            return <WidgetWrapper></WidgetWrapper>;
                        })}
                    </Widgets>
                ) : (
                    <Empty>Empty</Empty>
                )}
            </Content>
        </DashboardItemStyle>
    );
};

const Title = styled.div`
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    padding: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    overflow-y: overlay;
`;

const Widgets = styled.div`
    height: 100%;
    width: 100%;
`;

const WidgetWrapper = styled.div`
    padding: 8px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: ${(props) => props.theme.input.backgroundColor};
    }
`;

const Empty = styled.div``;

type DashboardItemStyleProps = {
    padding?: string;
};
export const DashboardItemStyle = styled.div<DashboardItemStyleProps>`
    ${baseCardStyle}
    cursor: pointer;
    width: 190px;
    height: 190px;
    @media (max-width: 768px) {
        width: 150px;
        height: 150px;
        font-size: ${(props) => props.theme.textSize.small};
    }
    padding: ${(props) => props.padding ?? '20px'};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export default DashboardItem;
