import { useFetchClient, type StrapiApp } from "@strapi/strapi/admin";
import { Button } from "@strapi/design-system";

const ConnectColorName = ({ model, document, documentId }) => {
  const { put, get } = useFetchClient();
  if (model === "api::palette.palette") {
    return {
      title: "Custom Button",
      content: (
        <Button
          onClick={() => {
            const names = document.points.map((item) => item.name);

            get("/content-manager/collection-types/api::color.color", {
              params: {
                filters: {
                  name: {
                    $in: names,
                  },
                },
              },
            }).then((response) => {
              const { results } = response.data;
              put(`/content-manager/collection-types/api::palette.palette/${documentId}`, {
                colors: {
                  connect: results.map((item) => item.id),
                },
              }).then((res) => {
                console.log("Connected colors:", res.data);
                window.location.reload();
              });
            });
          }}
        >
          Connect Color Name
        </Button>
      ),
    };
  }

  return null;
};

export default {
  register(app: StrapiApp) {
    app.getPlugin("content-manager").apis.addEditViewSidePanel((panels) => {
      return [ConnectColorName, ...panels];
    });
  },
};
