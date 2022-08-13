import Store from '$juicebox/utils/Store';
import type { ProjectSortType } from '$juicebox/models/project-visibility';
import type { Project } from '$juicebox/models/subgraph-entities/vX/project';

export const sortType = new Store<ProjectSortType>('totalPaid');

export const searchText = new Store<string>('');
export const searchResults = new Store<Project[]>([]);
export const scrollTarget = new Store<HTMLElement | null>(null);
export const hasSearched = new Store<boolean>(false);
export const isSearching = new Store<boolean>(false);
