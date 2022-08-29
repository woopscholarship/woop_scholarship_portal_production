import DashboardIcon from '$lib/assets/DashboardIcon.svelte';
import StudentIcon from '$lib/assets/StudentIcon.svelte';
import ApplyScholarshipIcon from '$lib/assets/ApplyScholarshipIcon.svelte';

const sidebarItems = {
  student: [
    {
      icon: DashboardIcon,
      text: 'Dashboard',
      href: '/dashboard'
    },
    {
      icon: StudentIcon,
      text: 'Student Profile',
      href: '/student-profile'
    },
    {
      icon: ApplyScholarshipIcon,
      text: 'Apply Scholarship/Grants',
      href: '/apply-scholarship'
    }
  ],
  sponsor: [
    {
      icon: DashboardIcon,
      text: 'Dashboard',
      href: '/dashboard'
    },
    {
      icon: StudentIcon,
      text: 'Student Profile',
      href: '/student-profile'
    },
    {
      icon: ApplyScholarshipIcon,
      text: 'Apply Scholarship/Grants',
      href: '/apply-scholarship'
    }
  ],
  admin: [
    {
      icon: StudentIcon,
      text: 'Review Students',
      href: '/admin/review-students'
    },
    {
      icon: ApplyScholarshipIcon,
      text: 'Review Sponsors',
      href: '/admin/review-sponsors'
    },
    {
      icon: ApplyScholarshipIcon,
      text: 'Review Scholarship Programs',
      href: '/admin/review-scholarship-programs'
    },
    {
      icon: ApplyScholarshipIcon,
      text: 'Review Scholarship Applicants',
      href: '/admin/review-scholarship-applicants'
    }
  ]
};

export default sidebarItems;