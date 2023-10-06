import { TextField, BaseTextFieldProps } from "@mui/material"
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";

interface FormTextFieldProps extends BaseTextFieldProps {
    customError?: string,
    minLength?: number,
    validationRegEx?: RegExp
}

const FormTextField: FC<FormTextFieldProps> = ({ name, customError, required, minLength, validationRegEx}) => {
    const { control } = useFormContext()

    const {field: { onChange, value }, fieldState: {invalid, error}} = useController({
        name,
        control,
        rules: { 
            required: required ?? true,
            minLength: { 
                value: minLength, 
                message: `${name} has to be at least ${minLength} characters`
            },  
            pattern: {
                value: validationRegEx,
                message: `Invalid ${name.toLowerCase()}`
            }
        }
    });

    return (
        <TextField error={customError ? true : invalid} helperText={customError ? customError : error && error.message} required={required ?? true}
            label={name} name={name}/>
    );
}

  export default FormTextField;