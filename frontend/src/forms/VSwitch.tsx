import { useEffect, useState } from 'react';
import { Switch, SwitchProps } from '@mui/material';
import { useField } from '@unform/core';

type TVSwitchProps = SwitchProps & {
  name: string;
}

export const VSwitch: React.FC<TVSwitchProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

  const [value, setValue] = useState(defaultValue || false);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => status,
      setValue: (_, newValue) => setStatus(newValue),
    });
  }, [registerField, fieldName, value, status]);


  return (
    <Switch
      {...rest}

      defaultChecked={defaultValue}

      checked={value || false}
      onChange={(e, checked) => { setValue(checked); rest.onChange?.(e, checked); setStatus(checked ? 1 : 0); error && clearError(); }}
    />
  );
};