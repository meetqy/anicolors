import { useFetchClient, type StrapiApp } from "@strapi/strapi/admin";
import { Button } from "@strapi/design-system";
import { useState } from "react";

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

    app.getPlugin("content-manager").apis.addBulkAction((actions) => {
      return [
        ({ documents, model }) => {
          if (model != "api::palette.palette") return null;

          return {
            label: "Change category",
            dialog: {
              type: "modal",
              title: "Change category",
              content: ({ onClose }) => {
                const [category, setCategory] = useState("");
                const { put } = useFetchClient();

                const handleSave = async () => {
                  console.log(documents);
                  put(`/content-manager/collection-types/api::category.category/${category}`, {
                    palettes: {
                      connect: documents.map((doc) => doc.id),
                    },
                  }).then((res) => {
                    onClose();
                    window.location.reload();
                  });
                };

                return (
                  <div style={{ padding: "24px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      <div>
                        <input
                          id="category"
                          type="text"
                          placeholder="Enter category document ID"
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #dcdce4",
                            borderRadius: "4px",
                          }}
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "8px",
                        }}
                      >
                        <button
                          onClick={onClose}
                          style={{
                            padding: "8px 16px",
                            border: "1px solid #dcdce4",
                            borderRadius: "4px",
                            background: "white",
                            cursor: "pointer",
                          }}
                        >
                          取消
                        </button>
                        <button
                          onClick={handleSave}
                          style={{
                            padding: "8px 16px",
                            border: "none",
                            borderRadius: "4px",
                            background: "#4945ff",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          保存
                        </button>
                      </div>
                    </div>
                  </div>
                );
              },
              onClose: () => {},
            },
          };
        },
        ...actions,
      ];
    });
  },
};
