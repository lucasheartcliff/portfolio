import type { TimelineItemProps } from 'antd/lib/timeline';
import AntdTimeline from 'antd/lib/timeline';
import React, { useEffect, useState } from 'react';

import Item from './Item';

interface ItemNode {
  key: string;
  title: string;
  startDate: string;
  endDate?: string;
  hasChildren?: boolean;
  isChild?: boolean;
  order: number;
  open: boolean;
}

type Node = {
  title: string;
  startDate: string;
  endDate?: string;
  children?: Node[];
};

interface Props {
  data: Node[];
}
export default function Timeline({ data }: Props) {
  const [nodeMap, setNodeMap] = useState<Map<string, ItemNode>>(new Map());
  const [nodes, setNodes] = useState<ItemNode[]>([]);

  function nodesMapToList(map: Map<string, ItemNode>): ItemNode[] {
    const result: { [k: number]: ItemNode } = {};

    for (const item of Array.from(map.values())) {
      result[item.order] = item;
    }
    return Object.values(result);
  }
  function toggleChildNodes(key: string) {
    if (!nodeMap.has(key)) return;

    const open = !nodeMap.get(key)?.open;
    const nodesList = nodesMapToList(nodeMap);
    const filteredNodes = open
      ? nodesList
      : nodesList.filter((n) => !n.key.includes(`${key}.`));
    const newNodeMap = new Map(nodeMap);
    const node = newNodeMap.get(key);
    if (node) node.open = open;

    setNodeMap(newNodeMap);
    setNodes(filteredNodes);
  }

  useEffect(() => {
    if (!data) return;
    const newNodeMap = new Map();

    let i = 0;
    let count = 0;
    for (const parent of data) {
      let j = 0;
      const hasChildren = !!parent.children?.length;

      let key = `${i}`;
      newNodeMap.set(key, {
        ...parent,
        key,
        hasChildren,
        order: count,
        open: true,
      });
      count += 1;

      if (hasChildren && parent.children?.length) {
        for (const child of parent.children) {
          key = `${i}.${j}`;
          newNodeMap.set(key, {
            ...child,
            key,
            order: count,
            hasChildren: false,
            isChild: true,
          });
          j += 1;
          count += 1;
        }
      }
      i += 1;
    }
    setNodeMap(newNodeMap);
    setNodes(nodesMapToList(newNodeMap));
  }, [data]);

  const renderItem = (item: ItemNode) => {
    return (
      <div className={item.isChild ? 'ml-5' : ''}>
        <Item
          {...item}
          onClickToOpen={() => {
            toggleChildNodes(item.key);
          }}
        />
      </div>
    );
  };

  const items = nodes.map((n) => {
    const result: TimelineItemProps = {
      children: renderItem(n),
      position: 'right',
    };
    if (n.isChild) result.color = 'gray';
    return result;
  });

  return (
    <div>
      <AntdTimeline items={items} />
    </div>
  );
}
