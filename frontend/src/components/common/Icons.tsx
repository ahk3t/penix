import { Icon, IconProps } from "@chakra-ui/react";

export const ChevronDownIcon = (props: IconProps) => (
  <Icon
    width="15"
    height="9"
    fill="currentColor"
    fillOpacity="0.75"
    viewBox="0 0 15 9"
    color="currentColor"
    {...props}
  >
    <path d="M7.5 0.348746C7.20406 0.357201 6.93348 0.467122 6.71364 0.703875L0.287486 7.28223C0.101466 7.46825 1.12358e-07 7.705 8.79649e-08 7.98403C3.91776e-08 8.54209 0.439685 8.99023 0.997746 8.99023C1.26832 8.99023 1.53044 8.88031 1.72492 8.68584L7.49155 2.75855L13.2751 8.68584C13.4696 8.87186 13.7232 8.99023 14.0023 8.99023C14.5603 8.99023 15 8.54209 15 7.98403C15 7.705 14.8985 7.46825 14.7125 7.28223L8.2779 0.703875C8.04961 0.467122 7.79594 0.348746 7.5 0.348746Z" />
  </Icon>
);

export default ChevronDownIcon;
