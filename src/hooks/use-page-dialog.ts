import { ref } from 'vue'
import PageDialog from '@/components/page-dialog'

type CallBackFn = (row?: any) => void

export function usePageDialog(addCb?: CallBackFn, editCb?: CallBackFn) {
  const pageDialogRef = ref<InstanceType<typeof PageDialog>>()
  const defaultInfo = ref({})
  const handleAddClick = () => {
    pageDialogRef.value!.dialogVisible = true
    defaultInfo.value = {}
    addCb && addCb()
  }
  const handleEditClick = (row: any) => {
    pageDialogRef.value!.dialogVisible = true
    defaultInfo.value = { ...row }
    editCb && editCb(row)
  }

  return { pageDialogRef, defaultInfo, handleAddClick, handleEditClick }
}
