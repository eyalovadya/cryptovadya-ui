import { WidgetType, Widget } from '../../../../../types/dashboard/widget';
import StatCard from './widgetTypes/StatCard';

type DashboardWidgetProps<T extends WidgetType = any> = {
    widget: Widget<T>;
};
const DashboardWidget = <T extends WidgetType = any>({ widget }: DashboardWidgetProps<T>) => {
    if (widget.type === 'STAT_CARD') return <StatCard subtitle="Source: coinbase" widget={widget} />;

    return <div>What are you doing</div>;
};

export default DashboardWidget;
