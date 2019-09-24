export function changeRequestIsComplete (changeRequest) {
  if (changeRequest.is_completed === undefined) {
    let isCompleted = true
    changeRequest.members.forEach(member => {
      if (!member.is_completed) {
        isCompleted = false
      }
    })
    return isCompleted
  } else {
    return changeRequest.is_completed
  }
}
