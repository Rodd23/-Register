import React from "react";
import { Typography } from "@mui/material";
import DrawerTemplate from "../../components/DrawerTemplate";

export default function Dashboard() {
  return (
    <DrawerTemplate title="Dashboard">
        <Typography mt={10} variant="h3" component="h1">
            BEM-VINDO
        </Typography>
    </DrawerTemplate>
    
  );
}
