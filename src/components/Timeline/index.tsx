import type { TimelineItemProps } from "antd/lib/timeline";
import AntdTimeline from "antd/lib/timeline";
import React, { useEffect, useState } from "react";

import Item from "./Item";

const theme = require("@/styles/themes");

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
  open?: boolean;
  children?: Node[];
};

interface Props {
  data: Node[];
}
export default function Timeline({ data }: Props) {
  const [nodeMap, setNodeMap] = useState<Map<string, ItemNode>>(new Map());
  const [nodes, setNodes] = useState<ItemNode[]>([]);
  const [closedNodes, setClosedNodes] = useState<Set<string>>(new Set());

  function nodesMapToList(map: Map<string, ItemNode>): ItemNode[] {
    const result: { [k: number]: ItemNode } = {};

    for (const item of Array.from(map.values())) {
      result[item.order] = item;
    }
    return Object.values(result);
  }
  function toggleChildNodes(key: string) {
    const newClosedNodes = new Set<string>(closedNodes);
    if (!newClosedNodes.has(key)) {
      newClosedNodes.add(key);
      nodeMap.get(key).open = false;
    } else {
      newClosedNodes.delete(key);

      nodeMap.get(key).open = true;
    }
    setClosedNodes(newClosedNodes);
  }

  useEffect(() => {
    if (!data) return;
    const newNodeMap = new Map();
    const newClosedNodes = new Set<string>();

    let i = 0;
    let count = 0;
    for (const parent of data) {
      let j = 0;
      const hasChildren = !!parent.children?.length;

      let key = `${i}`;
      const p = {
        ...parent,
        key,
        hasChildren,
        order: count,
        open: parent.open !== undefined ? parent.open : true,
      };
      if (!p.open) newClosedNodes.add(p.key);
      newNodeMap.set(key, p);

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
            open: false,
          });
          j += 1;
          count += 1;
        }
      }
      i += 1;
    }
    setNodeMap(newNodeMap);
    setClosedNodes(newClosedNodes);
    setNodes(nodesMapToList(newNodeMap));
  }, [data]);

  const renderItem = (item: ItemNode) => {
    return (
      <div className={item.isChild ? "ml-5" : ""}>
        <Item
          {...item}
          onClickToOpen={() => {
            toggleChildNodes(item.key);
          }}
        />
      </div>
    );
  };

  const items = nodes.reduce((acc, curr) => {
    if (curr.isChild) {
      const parentKey = curr.key.split(".")[0] as string;
      if (closedNodes.has(parentKey)) {
        return acc;
      }
    }

    const result: TimelineItemProps = {
      children: renderItem(curr),
      position: "right",
      color: theme.primary,
    };

    if (curr.isChild) result.color = "gray";

    acc.push(result);
    return acc;
  }, [] as TimelineItemProps[]);

  return (
    <div>
      <AntdTimeline items={items} />
    </div>
  );
}
