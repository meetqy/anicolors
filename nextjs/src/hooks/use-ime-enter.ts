import { useState, useCallback } from "react";

/**
 * 处理中文输入法下的 Enter 事件
 * @param {Function} onEnter - 用户按下 Enter 且输入法已结束时的回调
 */
export function useImeEnter(
  onEnter?: (e: React.KeyboardEvent<HTMLElement>) => void,
) {
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "Enter" && !isComposing) {
        e.preventDefault();
        onEnter?.(e);
      }
    },
    [isComposing, onEnter],
  );

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);

  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false);
  }, []);

  return {
    onKeyDown: handleKeyDown,
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
  };
}
