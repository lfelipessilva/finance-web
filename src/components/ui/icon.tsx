import {
  Apple,
  Car,
  Computer,
  Gift,
  Home,
  Settings,
  User,
  Wrench,
  ShoppingCart,
  Pizza,
  ReceiptText,
  Clapperboard,
  Plane,
  Shirt,
  BookOpen,
  TriangleAlert,
  HandHeart
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
  ShoppingCart,
  Pizza,
  ReceiptText,
  Clapperboard,
  Plane,
  Shirt,
  BookOpen,
  TriangleAlert,
  HandHeart
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
