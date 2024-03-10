import styled from "@emotion/styled";

interface ButtonProps {
  variant: "primary" | "secondary";
  children: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({variant, children, onClick}) => {
  return (
    <StyledButton onClick={onClick} type="button" variant={variant}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<Pick<ButtonProps, "variant">>`
  color: ${(props) => (props.variant === "primary" ? "white" : "black")};
  background-color: ${(props) => (props.variant === "primary" ? "orange" : "#dfe6ec")};
  border: none;
  border-radius: 24px;
  padding: 6px 12px;
  font-size: 16px;
  cursor: pointer;
`;
