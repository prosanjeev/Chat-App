import { Icon } from '@rsuite/icons';
import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Input, InputGroup} from 'rsuite';
import EditIcon from '@rsuite/icons/Edit';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

const EditableInput = ({
  initialValue,
  onSave,
  label = null,
  placeholder = 'Write your value',
  emptyMsg = 'Input is empty',
  wrapperClassName = '',
  ...inputProps
}) => {
  const [input, setInput] = useState(initialValue);
  const [isEditable, setIsEditable] = useState(false);

  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onEditClick = useCallback(() => {
    setIsEditable(p => !p);
    setInput(initialValue);
  }, [initialValue]);

  const onSaveClick = async () => {
    const trimmed = input.trim();

    if (trimmed === '') {
      toast(emptyMsg, 4000);
      return;
    }

    if (trimmed !== initialValue) {
      await onSave(trimmed);
    }

    setIsEditable(false);
  };

  return (
    <div className={wrapperClassName}>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          disabled={!isEditable}
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
        />
        <InputGroup.Button onClick={onEditClick}>
          {isEditable ? <CloseIcon/> : <EditIcon/>}
        </InputGroup.Button>
        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <CheckIcon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;