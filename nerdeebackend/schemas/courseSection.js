export default {
  name: "courseSection",
  title: "Course Section",
  type: "document",
  fields: [
    {
      name: "section_title",
      title: "Section Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "section_number",
      title: "Section Number",
      type: "number",
    },
    {
      name: "episodes",
      title: "Episodes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "episode" }] }],
    },
  ],
};
