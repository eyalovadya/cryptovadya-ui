import { Widget, WidgetType } from '../../../../../types/widgets';
import StatCard from './widgetTypes/StatCard';

type DashboardWidgetProps<T extends WidgetType> = {
    widget: Widget<T>;
    onDeleteWidget: () => Promise<void>;
};
const DashboardWidget = <T extends WidgetType>({ widget, onDeleteWidget }: DashboardWidgetProps<T>) => {
    if (widget.type === 'STAT_CARD') return <StatCard subtitle="Source: coinbase" widget={widget} onDeleteWidget={onDeleteWidget} />;

    return <div></div>;
};

export default DashboardWidget;
