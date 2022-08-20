export interface RouteData {
	text: string;
	href: string;
}

export interface SidebarComponent {
	displayName: string;
	profileImageURL: string;
	routes: RouteData[];
}

export interface ReviewTableTitle {
	title: string;
	subtitle: string;
}

export interface ReviewTableItem {
	label: string;
	value: any;
	type?: 'text' | 'image' | any;
}

export interface ReviewTable {
	title: ReviewTableTitle;
	items: ReviewTableItem[];
}

export interface TableItem {
	type: string;
	value: any;
}

export interface TableRow {
	items: TableItem[]
}


export interface Message {
	noResults: string;
}
