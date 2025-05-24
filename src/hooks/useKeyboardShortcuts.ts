import { useEffect } from "react";

interface ShortcutConfig {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  action: () => void;
}

export const useKeyboardShortcuts = (shortcuts: ShortcutConfig[]) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const matchingShortcut = shortcuts.find(
        (shortcut) =>
          shortcut.key.toLowerCase() === e.key.toLowerCase() &&
          !!shortcut.metaKey === e.metaKey &&
          !!shortcut.ctrlKey === e.ctrlKey &&
          !!shortcut.altKey === e.altKey &&
          !!shortcut.shiftKey === e.shiftKey
      );

      if (matchingShortcut) {
        e.preventDefault();
        matchingShortcut.action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
};
