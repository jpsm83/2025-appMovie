interface IButton {
    action: () => void,
    title: string
}

export const Button = ({ action, title }: IButton) => {
  return (
    <button onClick={action}>
      {title}
    </button>
  )
}
