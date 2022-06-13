import React, { ReactNode, useMemo, useState } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { FieldHookConfig, useField } from 'formik';
import Select, { ActionMeta, GroupBase, StylesConfig, MenuListProps } from 'react-select';
import { FormatOptionLabelMeta } from 'react-select/dist/declarations/src/Select';
import { FixedSizeList as List } from 'react-window';
import escapeRegExp from 'lodash/escapeRegExp';

// default react-select item padding top + bottom;
const DEFAULT_ITEM_PADDING = 16;

export type Option<T = string> = {
    value: T;
    label: string;
};
type Props<T = string> = {
    options: Option<T>[];
    label: string;
    appTheme: DefaultTheme;
    windowedListItemHeight?: number;
    listItemsView?: number;
    maxDisplayedOptions?: number;
    formatOptionLabel?: (data: Option<T>, formatOptionLabelMeta: FormatOptionLabelMeta<Option<T>>) => ReactNode;
} & FieldHookConfig<T>;

function SelectInput<T = string>({
    options,
    label,
    appTheme,
    formatOptionLabel,
    windowedListItemHeight,
    listItemsView,
    maxDisplayedOptions,
    ...props
}: Props<T>) {
    const [field, meta, { setValue, setTouched }] = useField(props);
    const hasError = meta.touched && !!meta.error;

    const onChange = (option: Option<T> | null, _actionMeta: ActionMeta<Option<T>>) => {
        if (option?.value) {
            setValue(option.value);
        }
    };

    const [inputValue, setInputValue] = useState<string>('');
    const filteredOptions = useMemo(() => {
        if (!inputValue) {
            return options;
        }

        const matchByStart = [];
        const matchByInclusion = [];

        const inputValueNoSpaces = inputValue.replaceAll(/\s/g, '');
        const regByInclusion = new RegExp(escapeRegExp(inputValueNoSpaces), 'i');
        const regByStart = new RegExp(`^${escapeRegExp(inputValueNoSpaces)}`, 'i');
        for (const option of options) {
            const optionLabelNoSpaces = option.label.replaceAll(/\s/g, '');
            if (regByInclusion.test(optionLabelNoSpaces)) {
                if (regByStart.test(optionLabelNoSpaces)) {
                    matchByStart.push(option);
                } else {
                    matchByInclusion.push(option);
                }
            }
        }

        return [...matchByStart, ...matchByInclusion];
    }, [inputValue, options]);

    const slicedOptions = useMemo(
        () => filteredOptions.slice(0, maxDisplayedOptions || options.length),
        [filteredOptions, maxDisplayedOptions, options.length]
    );
    return (
        <Container>
            <label htmlFor={props.id || props.name}>{label}</label>
            <Select
                styles={selectInputStyles<T>(appTheme, hasError)}
                defaultValue={options.find((option) => option.value === field.value)}
                options={slicedOptions}
                onChange={onChange}
                onBlur={(e) => setTouched(true)}
                formatOptionLabel={formatOptionLabel}
                components={windowedListItemHeight ? { MenuList: MenuList(windowedListItemHeight) } : undefined}
                minMenuHeight={0}
                maxMenuHeight={windowedListItemHeight && listItemsView ? (windowedListItemHeight + DEFAULT_ITEM_PADDING) * listItemsView : undefined}
                onInputChange={(value) => setInputValue(value)}
                filterOption={() => true} // disable native filter
            />
            <ErrorMessage>{hasError ? meta.error : ''}</ErrorMessage>
        </Container>
    );
}

// Windowing the menu list component to improve large lists performance
const MenuList = (itemHeight: number) =>
    function <T = string>(props: MenuListProps<Option<T>>) {
        const heightIncludingPadding = itemHeight + DEFAULT_ITEM_PADDING;

        const { options, children, maxHeight, getValue } = props;
        const [value] = getValue();
        const initialOffset = options.indexOf(value) * heightIncludingPadding;
        const childrenArr = React.Children.toArray(children);
        return (
            <List
                height={maxHeight}
                width="100%"
                itemCount={childrenArr.length || 0}
                itemSize={heightIncludingPadding}
                initialScrollOffset={initialOffset}
            >
                {({ index, style }: any) => <div style={style}>{childrenArr[index]}</div>}
            </List>
        );
    };

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const ErrorMessage = styled.div`
    color: red;
    height: 16px;
    font-size: ${(props) => props.theme.textSize.small};
`;

function selectInputStyles<T>(appTheme: DefaultTheme, hasError: boolean): StylesConfig<Option<T>, false, GroupBase<Option<T>>> {
    return {
        control: (provided) => ({
            ...provided,
            boxShadow: 'none',
            borderRadius: '14px',
            outline: 'none',
            backgroundColor: appTheme.input.backgroundColor,
            fontSize: appTheme.input.fontSize,
            color: appTheme.textColor,
            margin: '8px 0',
            height: '44px',
            border: `1px solid ${hasError ? 'red' : appTheme.input.backgroundColor}`
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled ? undefined : isSelected ? appTheme.appBackground : isFocused ? `${appTheme.appBackground}99` : undefined,
                color: appTheme.textColor,
                cursor: 'pointer',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: `${appTheme.colors.primary}33`
                }
            };
        },
        input: (provided) => ({
            ...provided,
            color: appTheme.textColor
        }),
        placeholder: (provided) => ({
            ...provided,
            color: appTheme.textColor
        }),
        singleValue: (provided) => ({
            ...provided,
            color: appTheme.textColor
        }),
        menu: (provided) => ({
            ...provided,
            color: appTheme.textColor,
            backgroundColor: appTheme.input.backgroundColor
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: appTheme.textColor
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            backgroundColor: appTheme.textColor
        })
    };
}

export default SelectInput;
