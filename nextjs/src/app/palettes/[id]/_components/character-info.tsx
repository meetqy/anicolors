import { CommonBreadcrumb } from "@/components/common-breadcrumb";
import type { Palette } from "@/query/palette";
import Link from "next/link";

export const CharacterInfo = ({ palette }: { palette: Palette }) => {
  return (
    <div className="prose container mx-auto mb-12">
      <CommonBreadcrumb
        items={[
          { label: "Home", href: "/" },
          {
            label: palette.category,
            href: `/categories/${palette.categoryExtend.slug}`,
          },
          { label: palette.name },
        ]}
      />
      <h1 className="mt-4 text-left capitalize">
        {palette.name} Color Palette - {palette.category}
      </h1>
      <p>
        This color palette is inspired by the character <b>{palette.name}</b>{" "}
        from{" "}
        <Link
          className="capitalize underline"
          href={`/categories/${palette.categoryExtend.slug}`}
        >
          {palette.category}
        </Link>
        . We've extracted these five iconic colors from the official character
        art. Want to create your own version? Hit the <b>"Custom Maker"</b>{" "}
        button below to get started!
      </p>

      <ul>
        <li>
          {" "}
          You can drag the markers to picker different colors, create your own
          color palettes.
        </li>
        <li>
          Free download {palette.category} {palette.name} transparent background
          png HD.
        </li>
      </ul>
    </div>
  );
};
