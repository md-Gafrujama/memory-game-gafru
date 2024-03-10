import styled from "@emotion/styled";

interface SettingsButtonProps {
  isActive?: boolean;
  children: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  width?: number;
  color?: string;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
  isActive,
  children,
  onClick,
  width,
  color,
}) => {
  return (
    <StyledButton onClick={onClick} color={color} type="button" isActive={isActive} width={width}>
      {children}
    </StyledButton>
  );
};

export default SettingsButton;

const StyledButton = styled.button<Pick<SettingsButtonProps, "isActive" | "width" | "color">>`
  color: white;
  background-color: ${({isActive, color}) => (color ? color : isActive ? "#31485a" : "#bcceda")};
  border: none;
  border-radius: 24px;
  padding: 10px;
  font-size: 18px;
  width: ${({width}) => (width ? `${width}px` : "100%")};
  cursor: pointer;
  display: inline-block;
`;
