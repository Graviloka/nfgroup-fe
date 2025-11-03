import React, { useId } from 'react';
import ReactSelect, { StylesConfig, components } from 'react-select';
import { PropertyTypeOption, SelectOption } from '../../types/forms';

interface SelectProps {
  options: PropertyTypeOption[] | SelectOption[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

// Custom styles to match existing design
const customStyles: StylesConfig<PropertyTypeOption | SelectOption, false> = {
  control: (provided, state) => ({
    ...provided,
    width: '100%',
    minHeight: '48px',
    borderRadius: '8px',
    border: state.isFocused
      ? '1px solid #7a1c1c'
      : '1px solid #d9d1c8',
    backgroundColor: 'white',
    fontSize: '15px',
    color: '#1a1a1a',
    boxShadow: state.isFocused
      ? '0 0 0 2px rgba(122, 28, 28, 0.2)'
      : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#7a1c1c' : '#d9d1c8',
    },
    cursor: 'pointer',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '12px 16px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9ca3af',
    fontSize: '15px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#1a1a1a',
    fontSize: '15px',
  }),
  input: (provided) => ({
    ...provided,
    color: '#1a1a1a',
    fontSize: '15px',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    border: '1px solid #d9d1c8',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    zIndex: 9999,
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '4px 0',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#7a1c1c'
      : state.isFocused
      ? '#fef2f2'
      : 'white',
    color: state.isSelected ? 'white' : '#1a1a1a',
    padding: '12px 16px',
    fontSize: '15px',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: state.isSelected ? '#7a1c1c' : '#fef2f2',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: '#9ca3af',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
    '&:hover': {
      color: '#6b7280',
    },
  }),
};

export function Select({ options, value, placeholder, onChange, className }: SelectProps) {
  const instanceId = useId();
  const selectedOption = options.find(option => option.value === value);

  return (
    <ReactSelect
      instanceId={instanceId}
      options={options}
      value={selectedOption}
      placeholder={placeholder}
      onChange={(selected) => onChange(selected?.value || '')}
      styles={customStyles}
      className={className}
      isSearchable={false}
      components={{
        IndicatorSeparator: null,
      }}
    />
  );
}
