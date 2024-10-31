/* eslint-disable react/prop-types */
import { MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

const Item = ({ title, path, icon }) => {
  const location = useLocation();
  const isSelected = path === location.pathname;

  return (
    <MenuItem
      component={<Link to={path} />}
      to={path}
      icon={icon}
      rootStyles={{
        color: isSelected ? "#FFFFFF" : "", // White text if selected, default color otherwise
        backgroundColor: isSelected ? "#1a435e" : "transparent", // Dark blue background if selected
        border: isSelected ? "2px solid #1a435e" : "none", // Dark blue border if selected
        borderRadius: "8px", // Optional: add some rounding for aesthetics
      }}
    >
      {title}
    </MenuItem>
  );
};

export default Item;
