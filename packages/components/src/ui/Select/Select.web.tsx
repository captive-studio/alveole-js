import React from 'react';
import ReactSelect, { GroupBase } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Box } from '../../core/Box';
import { useFieldId } from '../FormControl/FieldId';
import { useStyles as useSelectStyles } from './Select.styles';
import type { SelectOption, SelectProps, SelectRef } from './Select.types';
import { useSelectWebField } from './useSelectWebField';

type Group = GroupBase<SelectOption>;

export const Select = React.forwardRef<SelectRef, SelectProps>(function Select(props, ref) {
  const { creatable, onCreateOption } = props;

  const selectStyles = useSelectStyles();
  const { fieldProps, instanceRef, createLabel } = useSelectWebField(props, ref, selectStyles);
  // L'id vient du FormControl, dont l'étiquette désigne ainsi le champ (ADR 0026).
  const champ = { ...fieldProps, inputId: useFieldId() };

  return (
    <Box tag="form-control-select-input" style={selectStyles.inputContainer}>
      {creatable ? (
        <CreatableSelect<SelectOption, boolean, Group>
          {...champ}
          ref={instanceRef}
          onCreateOption={query => onCreateOption?.(query.trim())}
          formatCreateLabel={query => createLabel(query.trim())}
          createOptionPosition="first"
        />
      ) : (
        <ReactSelect<SelectOption, boolean, Group> {...champ} ref={instanceRef} />
      )}
    </Box>
  );
});
