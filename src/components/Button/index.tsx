import React from 'react';
import {ButtonContainer, ButtonText, ButtonProps} from './styles';

const Button: React.FC<ButtonProps> = ({title, ...props}) => {
  return (
    <ButtonContainer {...props}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

export default Button;
