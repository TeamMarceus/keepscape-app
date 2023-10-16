import { colorHexCodes } from '@/app-globals';

const formStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: state.isDisabled ? colorHexCodes.NEUTRAL['100'] : colorHexCodes.NEUTRAL['0'],
    borderRadius: '4px',
    borderWidth: 1,
    borderColor: state.menuIsOpen
      ? colorHexCodes.BLUE['300']
      : colorHexCodes.NEUTRAL['300'],
    boxShadow: null,
    padding: '12px 6px 5px 16px',

    '&:hover': {},
  }),
  placeholder: (base, state) => ({
    ...base,
    display:
      state.isFocused || state.isSelected || state.selectProps.inputValue
        ? 'none'
        : 'block',
    margin: '0',
    top: '35%',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0',
    fontFamily: "'Gotham', sans-serif",
    fontSize: '1rem',
    lineHeight: '1.5',
    overflow: 'initial',
    color: colorHexCodes.NEUTRAL['700'],
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: colorHexCodes.NEUTRAL['500'],
    padding: '4px 8px 12px',
    svg: {
      height: '16px',
      width: '16px',
    },
  }),
  multiValue: (base) => ({
    ...base,
    borderRadius: '16px',
    margin: '2px',
    padding: '0 4px',
    backgroundColor: colorHexCodes.NEUTRAL['100'],
  }),
  multiValueLabel: (base) => ({
    ...base,
    fontSize: '0.75rem',
  }),
  multiValueRemove: (base) => ({
    ...base,
    borderRadius: '0 12px 12px 0',
    '&:hover': {
      backgroundColor: 'transparent',
      color: colorHexCodes.RED['300'],
    },
  }),
  noOptionsMessage: (base) => ({
    ...base,
    fontFamily: "'Open Sans', sans-serif",
    fontSize: '1rem',
    lineHeight: '1.5',
    color: colorHexCodes.NEUTRAL['700'],
  }),
  input: (base) => ({
    ...base,
    margin: '4px 0 0 0',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? colorHexCodes.NEUTRAL['100'] : null,
    color: colorHexCodes.NEUTRAL['700'],
    opacity: '1',
    fontFamily: "'Open Sans', sans-serif",
    fontSize: '1rem',
    lineHeight: '1.5',
    overflow: 'initial',

    '&:hover': {
      backgroundColor: colorHexCodes.NEUTRAL['100'],
    },

    '&:active': {
      backgroundColor: colorHexCodes.NEUTRAL['100'],
    },
  }),
};

export default formStyles;
