import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export const Icon = ({ icon, size = "sm" }: FontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={icon} size={size} />;
};
