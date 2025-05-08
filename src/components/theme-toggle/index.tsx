import React, { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import useThemeStore from "@/store/theme";
import styles from "./index.module.less";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`切换到${theme === "light" ? "暗色" : "亮色"}模式`}
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeToggle;
