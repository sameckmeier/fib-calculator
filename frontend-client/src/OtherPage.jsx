import React from "react";
import { Link } from "react-router-dom";

export function OtherPage() {
  return (
    <div>
      I'm not the page you're looking for!
      <Link to="/"></Link>
    </div>
  );
}
