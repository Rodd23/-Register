import React from "react";
import { Typography } from "@mui/material";
import DrawerTemplate from "../../components/DrawerTemplate";

export default function Dashboard(props) {
  return (
    <DrawerTemplate title="Dashboard">
        <Typography mt={10} component="h1" variant="h3">
            BEM-VINDO
        </Typography>
    </DrawerTemplate>
    
  );
}
