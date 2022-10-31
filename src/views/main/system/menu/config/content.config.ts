export const contentTableConfig = {
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'url', label: '菜单url', minWidth: '100' },
    { prop: 'icon', label: '菜单icon', minWidth: '100' },
    { prop: 'permission', label: '按钮权限', minWidth: '100' },
    { prop: 'createAt', label: '创建时间', minWidth: '120', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '120', slotName: 'updateAt' },
    { label: '操作', minWidth: '100', slotName: 'handler' }
  ],
  tableTreeOpt: {
    rowKey: 'id',
    treeProps: { children: 'children' }
  },
  title: '菜单列表',
  addBtnTxt: '新建菜单',
  showSelection: false,
  showIndex: false,
  showFooter: false
}
