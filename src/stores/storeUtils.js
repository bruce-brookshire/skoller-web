import React from 'react'
import { useObserver, MobXProviderContext } from 'mobx-react'

function useStores () {
  return React.useContext(MobXProviderContext)
}

export function useRootStore () {
  const { rootStore } = useStores()
  return useObserver(() => (rootStore))
}

export function useInsightsStore () {
  const { rootStore } = useStores()
  return useObserver(() => (rootStore.insightsStore))
}

export function useUserStore () {
  const { rootStore } = useStores()
  return useObserver(() => (rootStore.userStore))
}

export function useStudentClassesStore () {
  const { rootStore } = useStores()
  return useObserver(() => (rootStore.studentClassesStore))
}

export function useStudentAssignmentsStore () {
  const { rootStore } = useStores()
  return useObserver(() => (rootStore.studentAssignmentsStore))
}
