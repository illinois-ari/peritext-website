import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",

  client: {
    skip: true, // Run in local mode
  },

  build: {
    outputFolder: "public/admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "teams",
        label: "Teams",
        path: "content/team",
        format: "json",
        match: {
          include: "*"
        },
        ui: {
          filename: {
            readonly: true,
            slugify: (values) =>
              values?.title?.toLowerCase().replace(/\s+/g, "-") || "unnamed-team"
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Team Name",
            isTitle: true,
            required: true,
          },
          {
            type: "number",
            name: "teamId",
            label: "Team ID",
            required: true,
            ui: {
              component: "number"
            }
          },
          {
            type: "object",
            name: "members",
            label: "Members",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name || "Unnamed Member"
              })
            },
            fields: [
              {
                type: "number",
                name: "memberId",
                label: "Member ID",
                required: true,
                ui: {
                  component: "number"
                }
              },
              { type: "string", name: "name", label: "Name" },
              { type: "image", name: "image", label: "Profile Image" },
              { type: "string", name: "social", label: "Social Profile URL" },
              {
                type: "string",
                name: "description",
                label: "Description",
                list: true,
              
              }
            ]
          }
        ]
      }
    ]
  }
});