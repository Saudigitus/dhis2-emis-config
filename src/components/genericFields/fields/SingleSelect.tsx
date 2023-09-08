import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { useField, type FieldRenderProps } from "react-final-form";
import { type CustomAttributeProps } from "../../../types/table/attributeColumns";
import { useOptions } from "../../../hooks/optionSets/useOptions";
import CircularProgress from '@material-ui/core/CircularProgress';


interface AutoCompleteProps {
  disabled?: boolean
  options?: CustomAttributeProps["options"]
  name: string
  filter: string
  resource:string
  fields:string
  option: any
  loading:boolean
}

const OptionSetAutocomplete = (props: AutoCompleteProps) => {
  const { input, meta }: FieldRenderProps<any, HTMLElement> = useField(props.name);
  const { loading } = props

  const options = (props?.option != null)
  ? props?.option.map((option: { id: string, displayName: string }) => ({
      value: option.id,
      label: option.displayName
    }))
  : [];

  return (
    <Autocomplete
      {...props}
      options={options}
      closeIcon={null}
      disabled={props.disabled}
      getOptionLabel={(option) => option.label}
      getOptionSelected={(option, value) => option.value === value.value}
      value={options.find((element: { value: string }) => element.value === input.value)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          error={(meta.touched === true) && meta.error}
          helperText={(meta.touched === true) && meta.error}
          size="small"
          InputProps={{
            ...params.InputProps,
            style: {
              backgroundColor: "#fff"
            },
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      onChange={(_, value) => {
        input.onChange(value?.value);
      }}
    />
  );
};

function SingleSelectField(props: AutoCompleteProps) {
  const { options, loading, getData } = useOptions(props.fields, props.resource, props.filter)

  React.useEffect(()=> {
    getData()
  },[props.name])

  return (
    <div>
      <OptionSetAutocomplete {...props} name={props.name} option={options} loading={loading}/>
    </div>
  );
}

export default SingleSelectField;
