import {
  Apple,
  Car,
  Computer,
  Gift,
  Home,
  Settings,
  User,
  Wrench,
} from "lucide-react";

const icons: Record<string, React.ElementType> = {
  Home,
  Settings,
  Computer,
  Gift,
  Apple,
  Wrench,
  Car,
  User,
};

const IconRenderer = ({
  iconName,
  background,
}: {
  iconName: string;
  background: string;
}) => {
  const IconComponent = icons[iconName] || Home;
  return (
    <IconComponent
      className="size-6 p-1 rounded-full text-white"
      style={{ backgroundColor: background }}
    />
  );
};

export default IconRenderer;
