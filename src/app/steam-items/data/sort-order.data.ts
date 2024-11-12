export const TagSortOrder : StringOrder[] = [
    {
        value : 'Stock',
        weight : 0
    },
    {
        value : 'Base Grade',
        weight : .8
    },
    {
        value : 'Industrial Grade',
        weight : 1
    },
    {
        value : 'Consumer Grade',
        weight : .9
    },
    {
        value : 'High Grade',
        weight : 2.2
    },
    {
        value : 'Mil-Spec Grade',
        weight : 3
    },
    {
        value : 'Industrial Grade',
        weight : 4
    },
    {
        value : 'Remarkable',
        weight : 4.1
    },
    {
        value : 'Exceptional',
        weight : 4.2
    },
    {
        value : 'Restricted',
        weight : 5
    },
    {
        value : 'Classified',
        weight : 6
    },
    {
        value : 'Master',
        weight : 6.6
    },
    {
        value  : 'Covert',
        weight : 8.1
    },
    {
        value : 'Extraordinary',
        weight : 8
    },
]

export interface StringOrder{
    weight : number,
    value : string
}