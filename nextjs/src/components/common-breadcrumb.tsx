import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import Script from "next/script";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CommonBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const CommonBreadcrumb = ({
  items,
  className = "not-prose",
}: CommonBreadcrumbProps) => {
  // 生成 JSON-LD 结构化数据
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `${env.NEXT_PUBLIC_SITE_URL}${item.href}` }),
    })),
  };

  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      {/* 面包屑导航 */}
      <Breadcrumb className={cn("not-prose", className)}>
        <BreadcrumbList>
          {items.map((item, index) => (
            <div
              className={cn("flex items-center", {
                "flex-1": index === items.length - 1,
              })}
              key={index}
            >
              <BreadcrumbItem className="line-clamp-1 flex-1">
                {item.href ? (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < items.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
