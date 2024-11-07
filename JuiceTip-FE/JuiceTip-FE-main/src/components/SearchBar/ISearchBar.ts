export interface ISearchBar{
    className?: string;
    onSearch: (query: string, index: number) => void
    placeholder?: string
    isChat?: boolean
}