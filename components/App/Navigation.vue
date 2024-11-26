<script setup lang="ts">
const { data } = await useAsyncGql({
  operation: 'navigation',
})

const flatListToHierarchical = (
    data = [],
    {idKey='key',parentKey='parentId',childrenKey='children'} = {}
) => {
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
</script>

<template>
  <div>
    <ul v-if="data">
      <li v-for="item in flatListToHierarchical(data?.menuItems?.nodes)">
        <NuxtLink :to="item.url">{{ item.title }}</NuxtLink>
        <ul v-if="item?.children">
          <li v-for="child in item.children">
            <NuxtLink :to="child.url">{{ child.title }}</NuxtLink>
            <ul v-if="child?.children">
              <li v-for="grand in child.children">
                <NuxtLink :to="grand.url">{{ grand.title }}</NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
