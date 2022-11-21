import chroma from 'chroma-js'
export default {
  control: () => ({
    display: 'flex',
    width: '12rem',
    height: '2.rem',
    border: '2px solid black',
    borderRadius: '.5rem',
    padding: '0 0.5rem',
    backgroundColor: '#fefbf6',
    cursor: 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    width: '12rem',
    border: '1px solid black',
    borderRadius: '.5rem',
    padding: 0,
    position: 'absolute',
    botton: '-1rem',
    backgroundColor: '#fefbf6',
    cursor: 'pointer',
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    const color = chroma('#c060a1')
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? color
        : isFocused
        ? '#c060a1'
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? '#c060a1'
          : 'black'
        : color,
      cursor: isDisabled ? 'not-allowed' : 'pointer',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? '#c060a1'
            : color.alpha(0.3).css()
          : undefined,
      },
    }
  },

  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: 'black',
    transition: 'all 0.3s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: 'black',
  }),
}

export const selectStyle = {
  control: () => ({
    display: 'flex',
    width: '100%',
    height: '2.rem',
    border: '2px solid black',
    borderRadius: '.5rem',
    padding: '0 0.5rem',
    backgroundColor: '#fefbf6',
    placeholder: 'black',
    cursor: 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    width: '100%',
    border: '1px solid black',
    borderRadius: '.5rem',
    padding: 0,
    position: 'absolute',
    botton: '-1rem',
    backgroundColor: '#fefbf6',
    color: 'black',
    cursor: 'pointer',
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    const color = chroma('#c060a1')
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? color
        : isFocused
        ? '#c060a1'
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? '#c060a1'
          : 'black'
        : color,
      cursor: isDisabled ? 'not-allowed' : 'pointer',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? '#c060a1'
            : color.alpha(0.3).css()
          : undefined,
      },
    }
  },
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: 'black',
    transition: 'all 0.3s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: 'black',
  }),
}
