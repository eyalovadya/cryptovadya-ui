import { WidgetResponse } from './responses';
import { WidgetType } from '.';

export type Widget<T extends WidgetType = WidgetType> = WidgetResponse<T>;
