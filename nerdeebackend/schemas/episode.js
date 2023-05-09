export default {
  name: "episode",
  title: "Episode",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "file",
      title: "File",
      type: "file",
      options: {
        accept: "video/*",
        storage: "sanity.default",
      },
      validation: (Rule) => Rule.required(),
    },
  ],
};
