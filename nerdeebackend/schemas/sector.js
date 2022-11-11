export default {
  name: "sector",
  title: "sector",
  type: "document",
  fields: [
    {
      name: "sector_uuid",
      title: "sector_uuid",
      type: "number",
    },
    {
      name: "sector_name",
      title: "sector_name",
      type: "string",
    },
    {
      name: "sector_image",
      title: "sector_image",
      type: "image",
      options: {
        hotspot: true,
      },
    },

    {
      name: "featured_courses",
      title: "featured_courses",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "course" }],
        },
      ],
    },
  ],
};
