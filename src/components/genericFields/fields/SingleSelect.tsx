import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { useField, type FieldRenderProps } from "react-final-form";
import { type CustomAttributeProps } from "../../../types/table/AttributeColumns";

interface AutoCompleteProps {
  disabled?: boolean
  options?: CustomAttributeProps["options"]
  name: string
  label?: string
  multiple?: boolean
  onChange?: any
}

const OptionSetAutocomplete = (props: AutoCompleteProps) => {
  const { input, meta }: FieldRenderProps<any, HTMLElement> = useField(props.name);

  const options = (props?.options?.optionSet?.options != null)
    ? props?.options.optionSet?.options.map((option: { value: string, label: string }) => ({
      value: option.value,
      label: option.label
    }))
    : [];

  return (
    <Autocomplete
      {...props}
      multiple={props.multiple !== undefined ? props.multiple : false}
      options={options}
      closeIcon={null}
      disabled={props.disabled}
      getOptionLabel={(option: any) => option.label}
      // getOptionSelected={(option: any, value) => option.value === value.value}
      value={
        props.multiple !== undefined && Boolean(props.multiple) && input.value?.length > 0
          ? input.value.map((val: any) => options.find((element: { value: string }) => element.value === val))
          : options.find((element: { value: string }) => element.value === input.value)
      }
      renderInput={(params: any) => (
        <TextField
          {...params}
          variant="outlined"
          error={(meta.touched === true) && meta.error}
          helperText={(meta.touched === true) && meta.error}
          size="small"
          label={props.label !== undefined ? props.label : ''}
          InputProps={{
            ...params.InputProps,
            style: {
              backgroundColor: "#fff"
            }
          }}
        />
      )}
      onChange={(_, value: any) => {
        input.onChange(props.multiple !== undefined && Boolean(props.multiple) ? value.map((v: { value: string }) => v.value) : value?.value);
        (Boolean(props.onChange)) && props.onChange(value)
      }}
    />
  );
};

function SingleSelectField(props: AutoCompleteProps) {
  return (
    <div>
      <OptionSetAutocomplete {...props} name={props.name} />
    </div>
  );
}

export default SingleSelectField;
