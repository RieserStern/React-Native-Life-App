import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
    font-weight: ${theme.fontWeights.regular};
    color: ${theme.colors.text.primary};
    flex-wrap: wrap;
    margin-top: 0px;
    margin-bottom: 0px;
`;

const title = (color, theme, center) => `
    font-size: ${theme.fontSizes.title};
    font-weight: ${theme.fontWeights.bold};
    ${color && `color: ${color};`}
    ${center && `text-align: center;`}
`;

const hint = (color, theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.thin};
    ${color && `color: ${color};`}
`;

const caption = (color, theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
    ${color && `color: ${color};`}
`;

const small = (color, theme) => `
  font-size: ${theme.fontSizes.small};
  font-weight: ${theme.fontWeights.thin};
  ${color && `color: ${color};`}
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
    font-size: ${theme.fontSizes.body};
`;

const label = (color, theme) => `
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
    ${color && `color: ${color};`}
`;

const bottom = (color, theme) => `
    font-size: ${theme.fontSizes.title};
    font-weight: ${theme.fontWeights.thin};
    ${color && `color: ${color};`}
`;

const variants = {
  body,
  hint,
  error,
  caption,
  label,
  bottom,
  title,
  small,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, color, theme, center }) =>
    variants[variant](color, theme, center)}
`;
