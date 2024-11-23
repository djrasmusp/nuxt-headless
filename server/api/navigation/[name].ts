import { print } from "graphql/language/printer";
import gql from "graphql-tag";

export default defineEventHandler( async (event) => {
    const name = getRouterParam(event, 'name')

    const menuQuery = gql`
        query MENU_ITEMS {
            menuItems(where: {location: ${name}}) {
                nodes {
                    key: id
                    parentId
                    title: label
                    target
                    path
                    url
                }
            }
        }
    `;

    try{
        const data = await $fetch(`${process.env.NUXT_PUBLIC_WORDPRESS_API_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                query: print(menuQuery)
            },
            cache: 'default'
        })

        return flatListToHierarchical(data?.data.menuItems.nodes);
    }catch (err){
        return err
    }
})

function  flatListToHierarchical(
    data = [],
    {idKey='key',parentKey='parentId',childrenKey='children'} = {}
) {
    const tree = [];
    const childrenOf = {};
    data.forEach((item) => {
        const newItem = {...item};
        const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
        childrenOf[id] = childrenOf[id] || [];
        newItem[childrenKey] = childrenOf[id];
        parentId
            ? (
                childrenOf[parentId] = childrenOf[parentId] || []
            ).push(newItem)
            : tree.push(newItem);
    });
    return tree;
};