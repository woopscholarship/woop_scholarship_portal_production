import sidebarItems from './initSidebarItems';

type SidebarItem = {
	icon: any;
	text: string;
	href: string;
};

const adminRoutes: string[] = sidebarItems.admin.map((item: SidebarItem) => {
	return item.href;
});

const sponsorRoutes: string[] = sidebarItems.sponsor.map((item: SidebarItem) => {
	return item.href;
});

const studentRoutes: string[] = sidebarItems.student.map((item: SidebarItem) => {
	return item.href;
});

const UserRoutes = [['/admin', ...adminRoutes], [...sponsorRoutes], [...studentRoutes]];

export default {
	userRoutes: UserRoutes,
	getUserRouteIndex(userType: string) {
		if (userType === 'admin') return 0;
		if (userType === 'sponsor') return 1;
		if (userType === 'student') return 2;
		return -1;
	}
};
