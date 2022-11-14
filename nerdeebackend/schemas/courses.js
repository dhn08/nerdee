export default {
  title: "Course",
  name: "course",
  type: "document",
  fields: [
    {
      title: "title",
      name: "title",
      type: "string",
    },
    {
      title: "author",
      name: "author",
      type: "string",
    },
    {
      title: "description",
      name: "description",
      type: "string",
    },
    {
      title: "price",
      name: "price",
      type: "number",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
