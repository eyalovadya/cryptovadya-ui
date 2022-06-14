# CryptOvadya UI
CryptOvadya is a platform for creating and managing dashboards of crypto data.

Website - [cryptovadya.com](https://www.cryptovadya.com) \
API repo - [CryptOvadya API](https://github.com/eyalovadya/cryptovadya-api)

## Table of Content:

- [Features](#features)
- [Built With](#built-with)
- [Setup](#setup)
- [Main Entities](#main-entities)
  - [Widget](#widget)
  - [Dashboard](#dashboard)
  - [User](#user)
- [Environment Variables](#environment-variables)

## Features
- User login and registration
- Create multiple dashboards 
- Create multiple widgets for each dashboard 
- Option to delete dashboard/widget
- Update user details (first name, last name)
- Update dashboard title
- Switch between dark and light theme

![CryptOvadya Platform](https://media.giphy.com/media/cscsyMQtPXFz5BSgTQ/giphy.gif)

## Built With

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [styled-components](https://styled-components.com/)
- [Rematch](https://github.com/rematch/rematch) with [Reselect](https://www.npmjs.com/package/reselect) for state management
- [Formik](https://formik.org/)
- [React Select](https://react-select.com/home)

Check [package.json](https://github.com/eyalovadya/cryptovadya-ui/blob/master/package.json) for more :wink:

## Setup

First you need to clone or download the repository.\
Then, in the project root directory:
1. Run `npm install` to get the npm dependencies
2. Create .env file and add the [environment variables](#environment-variables)
3. Run `npm start` to run the app in the development mode
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser (it should open automatically) \
   The page will reload if you make edits and you will see any lint errors in the console.

## Main Entities

### Widget
Widget is a generic entity, it represents a common set of data which you would like to see in the dashboard. \
Each widget has a type `WidgetType` by which the data to be represented is determined. \
In this project we have a single type of widget `STAT_CARD`. \
`STAT_CARD` data gives us information about a single crypto pair.

#### TypeScript representation: 

#### `Widget Type`
```typescript
const WIDGET_TYPES = ['STAT_CARD'] as const;
type WidgetType = typeof WIDGET_TYPES[number]; // compiles to - type WidgetType = 'STAT_CARD'
```
If you would like to add more widget types, just add them to the `WIDGET_TYPES` array. \
For each widget type you need to create the corresponding `WidgetData` type (e.g. `StatCardData`) and add UI component to represent the data in [here](https://github.com/eyalovadya/cryptovadya-ui/blob/master/src/components/pages/singleDashboard/components/dashboardWidget/DashboardWidget.tsx).

**StatCardData Example:**
```typescript
type StatCardData = {
    baseCurrency: string;
    quoteCurrency: string;
    value: number;
    dayDiffPrecent: number;
};
```

#### `Widget Data`
```typescript
type WidgetData<T extends WidgetType = WidgetType> = T extends 'STAT_CARD' ? StatCardData : any;
```
To add new data type extend to ternary expression. 
For example: 
```typescript
type WidgetData<T extends WidgetType = WidgetType> = T extends 'STAT_CARD' ? StatCardData : 'NEW_TYPE' ? NewTypeData : any;
```

#### `Widget`
```typescript
type Widget<T extends WidgetType = WidgetType> = {
    id: number;
    dashboardId: number;
    type: T;
    data: WidgetData<T>;
};
```
Widget have a generic widget type parameter `T` which defaults to all widget types. Then we determine the data prop type with `WidgetData<T>`

### Dashboard
Dashboard have a title and a collection of widgets of all types.

#### TypeScript representation: 
```typescript
type Dashboard = {
    id: number;
    userId: string;
    title: string;
    widgets: Widget[];
};
```

### User
User can manage a collection of dashboards.


#### TypeScript representation: 
```typescript
export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
};
```

## Environment Variables
```sh
REACT_APP_API_URL=
```

## Credits
[Eyal Ovadya](https://github.com/eyalovadya) :)
