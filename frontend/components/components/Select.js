import RSelect from 'react-select';

const customStyles = {
    control: base => ({
        ...base,
        height: 25,
        minHeight: 30,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        fontSize: 14,
        marginBottom: 0,  
        border:0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
        
        
    }),
    input: (provided, state) => ({
        ...provided,
        
        height: 25,
        display: 'flex',
        alignItems: 'center',
    }),
    singleValue: (provided, state) => ({
        ...provided,
        lineHeight: 1,
        paddingTop: 0,
        paddingBottom: 1,
        marginTop: 0,
        marginBottom: 1,
    }),
    valueContainer: base => ({
        ...base,
        height: 30,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
    }),
    dropdownIndicator: (styles) => ({
        ...styles,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
        
    }),
    clearIndicator: (styles) => ({
        ...styles,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
    }),
};

const Select = ({ name, options,value ,onChange, placeholder, onInputChange ,needBottomInput = false , isDisabled = false}) => {
    return (<RSelect name={name} className={needBottomInput ? 'bottominput': ''} styles={customStyles} onChange={onChange} options={options} onInputChange={onInputChange} value={
        options.filter(option => 
           option.value === value).length > 0 ? options.filter(option => 
            option.value === value) : null
     }
     placeholder={placeholder} 
     isDisabled={isDisabled}/> )
}

export default Select;