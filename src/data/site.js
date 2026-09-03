// Central place for chapter info that isn't page-specific.
// Everything marked TODO is a placeholder — replace with real info.

export const site = {
  chapterName: "Collegiate 100 at University of Houston",
  chapterNickname: "Clutch City",
  university: "University of Houston",
  tagline: "Developing student leaders. Serving Houston's youth.",

  mission:
    "Collegiate 100® is a campus-based organization dedicated to developing student leaders while supporting the social, emotional, and educational growth of youth through mentorship and community engagement. As an extension of 100 Black Men of America, Inc., the program provides college students with opportunities to continue impactful mentoring initiatives while fostering leadership, accountability, and service.",

  contactEmail: "uh.collegiate100@gmail.com",
  instagramUrl: "https://www.instagram.com/uh_c100/",
  linkedinUrl: "https://www.linkedin.com/company/collegiate-100-at-university-of-houston/",
  nationalOrgUrl: "https://100blackmen.org", // 100 Black Men of America, Inc.

  meetingSchedule:
    "General Body Meetings: TBD each semester. Check Instagram and this page for the current schedule.", // TODO

  membership: {
    requirements: [
      "Currently enrolled at the University of Houston",
      "Must be in good standing with the university",
      "Minimum cumulative GPA of 2.75",
      "Attend the mandatory new-member orientation",
      "Maintain active attendance at general body meetings and chapter events",
    ],
    dues: "Dues amount TBD. Contact the chapter for current semester pricing.", // TODO
    pointsSystemNote:
      "Members earn involvement points for attending meetings, workshops, and service events. Point requirements per semester: TBD.", // TODO
  },

  pillars: [
    {
      name: "Mentoring",
      description:
        "Pairing members with Houston-area youth for consistent, positive mentorship that builds confidence and life skills.",
    },
    {
      name: "Education",
      description:
        "Academic support, tutoring, and college-readiness programming that keeps mentees on track for their next step.",
    },
    {
      name: "Health & Wellness",
      description:
        "Promoting physical and mental well-being through wellness workshops, active events, and open conversations about health.",
    },
    {
      name: "Economic Development",
      description:
        "Financial literacy, career exposure, and professional development that prepares members and mentees for long-term success.",
    },
  ],
};

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/exec-board", label: "Exec Board" },
  { to: "/graduates", label: "Graduates" },
  { to: "/contact", label: "Contact" },
];
