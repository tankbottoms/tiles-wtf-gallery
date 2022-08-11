export type ProjectState = 'active' | 'archived';

export const projectCategory = ['trending', 'holdings', 'myprojects', 'all'] as const;
export type ProjectCategory = typeof projectCategory[number];

export const projectSearchFilter = ['v1', 'v1.1', 'archived'] as const;
export type ProjectSearchFilter = typeof projectSearchFilter[number];

export const projectSortType = ['totalPaid', 'createdAt'] as const;
export type ProjectSortType = typeof projectSortType[number];
