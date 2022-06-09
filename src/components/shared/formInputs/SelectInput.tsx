import { ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { FieldHookConfig, useField } from 'formik';
import Select, { ActionMeta, GroupBase, StylesConfig } from 'react-select';
import { FormatOptionLabelMeta } from 'react-select/dist/declarations/src/Select';

export type Option<T = string> = {
    value: T;
    label: string;
};
type Props<T = string> = {
    options: Option<T>[];
    label: string;
    appTheme: DefaultTheme;
    formatOptionLabel?: (data: Option<T>, formatOptionLabelMeta: FormatOptionLabelMeta<Option<T>>) => ReactNode;
} & FieldHookConfig<T>;

function SelectInput<T = string>({ options, label, appTheme, formatOptionLabel, ...props }: Props<T>) {
    const [field, meta, { setValue, setTouched }] = useField(props);
    const hasError = meta.touched && !!meta.error;

    const onChange = (option: Option<T> | null, _actionMeta: ActionMeta<Option<T>>) => {
        if (option?.value) setValue(option.value);
    };

    return (
        <Container>
            <label htmlFor={props.id || props.name}>{label}</label>
            <Select
                styles={selectInputStyles<T>(appTheme, hasError)}
                defaultValue={options.find((option) => option.value === field.value)}
                options={options}
                onChange={onChange}
                onBlur={(e) => setTouched(true)}
                formatOptionLabel={formatOptionLabel}
            />
            <ErrorMessage>{hasError ? meta.error : ''}</ErrorMessage>
        </Container>
    );
}

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
