import styled from 'styled-components';
import { Dashboard } from '../../../../types/dashboard';
import { baseCardStyle } from '../../../../shared/styles';
import CoinPair from '../../../shared/CoinPair';

type Props = {
    dashboard: Dashboard;
};

const DashboardItem = ({ dashboard }: Props) => {
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
                                    <WidgetWrapper>
                                        <CoinPair key={widget.id} base={baseCurrency} quote={quoteCurrency} />
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
    padding: ${(props) => props.padding ?? '20px'};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export default DashboardItem;
