export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
    },
    {
      name: "message",
      title: "Message",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    // {
    //   name: "created",
    //   title: "Created",
    //   type: "datetime",
    //   options: {
    //     dateFormat: "YYYY-MM-DD",
    //     timeFormat: "HH:mm",
    //     calendarTodayLabel: "Today",
    //   },
    //   validation: (Rule) => Rule.required(),
    // },
  ],
};
