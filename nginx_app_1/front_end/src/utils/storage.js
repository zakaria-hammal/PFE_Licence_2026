const KEY = 'form_messages'

export function getMessages() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
export function addMessage({ name, email, message }) {
  const messages = getMessages()
  const newMsg = {
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  }
  messages.unshift(newMsg)
  localStorage.setItem(KEY, JSON.stringify(messages))
  return newMsg
}
export function removeMessage(id) {
  const messages = getMessages().filter(m => m.id !== id)
  localStorage.setItem(KEY, JSON.stringify(messages))
  return messages
}
