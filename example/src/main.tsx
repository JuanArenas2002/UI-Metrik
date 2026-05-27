import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@unisimon/metrik-ui";
import { Showcase } from "./Showcase";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider delayDuration={200}>
      <Showcase />
    </TooltipProvider>
  </StrictMode>,
);
