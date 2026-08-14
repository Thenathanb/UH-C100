// Recent graduates, grouped by graduation term.
// Headshot files: drop a photo at the given `photo` path (same filename) and it appears automatically.
// `whatsNext` (post-grad plans) is optional — omit it and the card just skips that line.
// `linkedin` is optional too — cards without one aren't clickable (no dead links).

export const graduates = [
  {
    term: "Class of 2026", // TODO: confirm exact graduation term (Spring/Summer 2026) per person
    people: [
      {
        name: "Alaya Lee",
        degree: "Education",
        photo: "/images/grads/alaya-lee.jpg",
        linkedin: "https://www.linkedin.com/in/alaya-lee-684360338/",
      },
      {
        name: "Jaiden Boyd",
        degree: "Management Information Systems, Minor in Marketing",
        photo: "/images/grads/jaiden-boyd.jpg",
        linkedin: "https://www.linkedin.com/in/jaiden-boyd/",
      },
      {
        name: "Nilah Hurd",
        degree: "Political Science, Minor in Legal Studies & African American Studies",
        photo: "/images/grads/nilah-hurd.jpg",
        linkedin: "https://www.linkedin.com/in/nilah-hurd-b2b98a349/",
      },
      {
        name: "Chloe Dennis",
        degree: "Health",
        photo: "/images/grads/chloe-dennis.jpg",
        linkedin: "https://www.linkedin.com/in/chloe-dennis-48a7872bb/",
      },
      {
        name: "Ronelle Urey",
        degree: "Public Health",
        photo: "/images/grads/ronelle-urey.jpg",
        linkedin: "https://www.linkedin.com/in/ronelle-urey-0ab30925b/",
      },
      {
        name: "Paris Joubert",
        degree: "Kinesiology",
        photo: "/images/grads/paris-joubert.jpg",
      },
      {
        name: "Nick Samuel",
        degree: "Management Information Systems",
        photo: "/images/grads/nick-samuel.jpg",
      },
      {
        name: "Dominique Barnes",
        degree: "Finance",
        photo: "/images/grads/dominique-barnes.jpg",
        linkedin: "https://www.linkedin.com/in/dominique-barnes-/",
      },
    ],
  },
];
