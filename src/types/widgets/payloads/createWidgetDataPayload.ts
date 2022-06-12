import { WidgetType } from '../widgetType';
import { CreateStatCardDataPayload } from './widgetTypes/statCard/createStatCardDataPayload';

export type CreateWidgetDataPayload<T extends WidgetType = WidgetType> = T extends 'STAT_CARD' ? CreateStatCardDataPayload : any;
