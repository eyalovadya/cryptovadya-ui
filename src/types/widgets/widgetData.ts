import { WidgetType } from '.';
import { StatCardData } from './widgetTypesData';

export type WidgetData<T extends WidgetType = WidgetType> = T extends 'STAT_CARD' ? StatCardData : any;
