import { WidgetType, Widget } from './../widget';
import { CreateStatCardPayload } from '.';

export type CreateDashboardWidgetPayload<T extends WidgetType> = T extends 'STAT_CARD' ? CreateStatCardPayload : any;
