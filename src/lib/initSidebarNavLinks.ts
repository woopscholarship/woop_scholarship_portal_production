export const adminRoutes = [
  {
    text: 'Review Students',
    href: '/admin/review-students'
  },
  {
    text: 'Review Sponsors',
    href: '/admin/review-sponsors'
  },
  {
    text: 'Review Scholarship Programs',
    href: '/admin/review-scholarship-programs'
  },
  {
    text: 'Review Student Applications',
    href: '/admin/review-student-applications'
  }
];

export const sponsorRoutes = [
  {
    text: 'Student Applications',
    href: '/sponsor/student-applications'
  },
  {
    text: 'Scholarship Programs',
    href: '/sponsor/scholarship-programs'
  },
  {
    text: 'Launch New Program',
    href: '/sponsor/launch-new-program'
  },
];

export const studentRoutes = {
  profile: [
    {
      text: 'Profile',
      href: '/student/profile'
    },
  ],
  main: [
    {
       text: 'Dashboard',
       href: '/student/dashboard'
    },
    {
      text: 'Apply Scholarship',
      href: '/student/apply-scholarship'
    },
    {
      text: 'Applied Scholarships',
      href: '/student/applied-scholarships'
    },
  ],
  integrated: [
    // {
    //   text: 'Student Loan',
    //   href: '/student/apply-student-loan-program'
    // }
  ]
}