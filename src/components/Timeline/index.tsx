import AntdTimeline from 'antd/lib/timeline';
import React, { useEffect, useState } from 'react';

type Node = {
  title: string;
  startTime: string;
  endTime?: string;
  children?: Node[];
};

interface Props {
  data: Node[];
}
export default function Timeline({ data }: Props) {
  const [nodeMap, setNodeMap] = useState(new Map());
  const [nodes, setNodes] = useState([]);

  function nodesMapToList(map: Map) {
    return Object.values(
      map.reduce((acc, cur) => {
        acc[curr.order] = cur;
        return acc;
      }, {})
    );
  }
  function toggleChildNodes(key: string) {
    const open = !nodeMap.get(key).open;
    const nodes = nodesMapToList(nodeMap);
    const filteredNodes = open
      ? nodes
      : nodes.filter((n) => !n.key.includes(`${key}.`));
    const newNodeMap = new Map(nodesMap);
    newNodeMap.get(key).open = open;

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
      const hasChildren = !!parent.children;

      let key = `${i}`;
      newNodeMap.set(key, {
        ...parent,
        key,
        hasChildren,
        order: count,
        open: true,
      });
      if (hasChildren) {
        for (const child of parent.children) {
          key = `${i}.${j}`;
          newNodeMap.set(key, {
            ...child,
            key,
            order: count,
            hasChildren: false,
          });
          j++;
          count++;
        }
      }
      i++;
    }
    setNodeMap(newNodeMap);
    setNodes(nodesMapToList(newNodeMap));
  }, [data]);

  return (
    <div>
      <AntdTimeline />
    </div>
  );
}
