import React from "react";
import { Link } from "react-router-dom";
import { IconArrowNarrowLeft } from "@tabler/icons-react";

interface BackLinkProps {
  title?: string;
  route?: any;
  onClick?: () => void;
}

const BackLink = ({ title, route, onClick }: BackLinkProps) => {
  return (
    <Link style={{ display: "flex", alignItems: "center", color: "#000", gap: "10px", marginBottom: "8px" }} to={route} onClick={onClick}>
      <IconArrowNarrowLeft stroke={1.6} /> {title}
    </Link>
  );
};
export default BackLink;
