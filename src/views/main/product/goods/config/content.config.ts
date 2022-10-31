export const contentTableConfig = {
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '100' },
    { prop: 'newPrice', label: '现价格', minWidth: '60', slotName: 'newPrice' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '80', slotName: 'image' },
    { prop: 'address', label: '发货地址', minWidth: '70' },
    { prop: 'inventoryCount', label: '库存', minWidth: '70' },
    { prop: 'status', label: '状态', minWidth: '70', slotName: 'status' },
    { prop: 'createAt', label: '创建时间', minWidth: '120', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '120', slotName: 'updateAt' },
    { label: '操作', minWidth: '100', slotName: 'handler' }
  ],
  title: '商品列表',
  addBtnTxt: '添加商品',
  showSelection: true,
  showIndex: true
}
