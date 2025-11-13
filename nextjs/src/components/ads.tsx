"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function AdsBanner728_90({ className }: { className?: string }) {
  const pathname = usePathname();
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    // 清空旧内容
    banner.innerHTML = "";

    // 插入设置脚本
    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.innerHTML = `
      atOptions = {
        'key' : '1dcbf041d6c145344194453a4454360c',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    banner.appendChild(configScript);

    // 插入广告脚本
    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src =
      "//abateadversity.com/1dcbf041d6c145344194453a4454360c/invoke.js";
    banner.appendChild(invokeScript);
  }, [pathname]);

  return <div className={`${className}`} ref={bannerRef} />;
}
