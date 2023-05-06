export default {
  name: "user",
  title: "user",
  type: "document",
  fields: [
    {
      name: "name",
      title: "name",
      type: "string",
    },
    {
      name: "email",
      title: "email",
      type: "string",
    },
    {
      name: "password",
      title: "password",
      type: "string",
    },
    {
      name: "role",
      title: "role",
      type: "string",
    },
    {
      name: "courses",
      title: "courses",
      type: "array",
      of: [{ type: "reference", to: [{ type: "course" }] }],
    },
  ],
};
