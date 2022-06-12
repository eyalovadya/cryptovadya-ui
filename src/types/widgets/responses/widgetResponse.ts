import { Widget, WidgetType } from '..';

export type WidgetResponse<T extends WidgetType = WidgetType> = Widget<T>;
