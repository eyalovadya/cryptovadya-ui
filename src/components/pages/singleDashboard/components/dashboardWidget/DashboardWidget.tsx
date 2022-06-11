import { WidgetType, Widget } from '../../../../../types/dashboards/widget';
import StatCard from './widgetTypes/StatCard';

type DashboardWidgetProps<T extends WidgetType> = {
    widget: Widget<T>;
};
const DashboardWidget = <T extends WidgetType>({ widget }: DashboardWidgetProps<T>) => {
    if (widget.type === 'STAT_CARD') return <StatCard subtitle="Source: coinbase" widget={widget} />;

    return <div></div>;
};

export default DashboardWidget;
